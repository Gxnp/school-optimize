export async function POST(req) {
    const { otp } = await req.json();
  
    if (otp === "111111") {
      return Response.json({ success: true, message: "ยืนยันสำเร็จ" });
    } else {
      return Response.json({ success: false, message: "รหัส OTP ไม่ถูกต้อง" }, { status: 400 });
    }
  }
  