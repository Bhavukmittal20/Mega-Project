import dotenv from 'dotenv';
import { supabase } from "../config/connectDB.js";
import bcrypt from 'bcrypt';
import { createTransport } from 'nodemailer';

dotenv.config();

const login = async (req, res) => {
    const { email } = req.body;
    console.log(`\n\n--- 🕵️ NEW REQUEST for ${email} ---`);

    // ... (user check code is fine, skipping for brevity)
    const { data: users, error: userError } = await supabase.from('users').select('email').eq('email', email).single();
    if (!users) return res.json({ success: false, message: 'Please Sign Up first' });
    // ...

    const { data: existingOtp, error: otpFetchError } = await supabase
        .from('otp')
        .select('created_at')
        .eq('email', email)
        .single();

    if (otpFetchError && otpFetchError.code != 'PGRST116') {
        return res.json({ success: false, message: 'Server Error2' });
    }

    if (existingOtp) {
        console.log("✅ Found existing OTP. Checking cooldown...");

        const lastIssued = new Date(existingOtp.created_at).getTime();
        const now = Date.now();
        const cooldown = 60 * 1000; // 1 minute in ms
        const difference = now - lastIssued;

        // --- SACH YAHAN DIKHEGA ---
        console.log(`   [DB Time]  Last Issued: ${existingOtp.created_at} (${lastIssued})`);
        console.log(`   [Code Time]        Now: ${new Date(now).toISOString()} (${now})`);
        console.log(`   DIFFERENCE (Now - Last): ${difference} ms`);
        console.log(`   Is Difference < 60000?  ${difference < cooldown}`);
        // -------------------------

        if (difference < cooldown) {
            console.log("   ❌ RESULT: Cooldown ACTIVE. Request Blocked.");
            return res.json({
                success: false,
                message: 'Please wait 1 minute before requesting another OTP',
            });
        } else {
            console.log("   ✅ RESULT: Cooldown PASSED. Proceeding.");
        }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Skipping email send for faster debug
    // try { ... } catch (e) { ... }

    const hash = await bcrypt.hash(otp, 10);
    const nowISO = new Date().toISOString();
    const expiresAtISO = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    console.log(`   UPDATING DB with new created_at: ${nowISO}`);
    const { error: otpError } = await supabase.from('otp').upsert({
        email: email,
        otp_hash: hash,
        issigningup: false,
        created_at: nowISO,
        expires_at: expiresAtISO,
    });

    if (otpError) {
        console.error('Supabase upsert error:', otpError);
        return res.json({ success: false, message: 'Failed to store OTP.' });
    }

    console.log("--- ✅ Request Finished Successfully ---");
    return res.json({ success: true, message: 'OTP sent successfully' });
};

export {login};
