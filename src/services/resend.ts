import { Resend } from "resend"

/* 寄送重設密碼信件 */
const sendResetPasswordEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const frontEndUrl = process.env.FRONTEND_URL

  // 寄信
  await resend.emails.send({
    from: "【104】密碼重設<onboarding@resend.dev>",
    to: email,
    subject: "【104】重設密碼功能信件",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #fff2f2;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #52525b;
          }
          .button {
            background: linear-gradient(96.66deg, #fe839a 9.67%, #4a72ff 112.21%);
            display: block; /* Change to block */
            width: fit-content;
            padding: 10px 20px;
            margin: 20px auto; /* Auto margins for centering */
            color: white !important;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 99999px;
          }
          .button:hover {
            transform: scale(1.05);
          }
          table {
            width: 100%;
          }
          .centered-content {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <img
            // TODO: 這裡的圖片連結要更換成 github 上的連結
              src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/logo.png"
              alt="logo"
            />
          </h1>
          <p>
            這是一封<strong>重設密碼</strong>的確認信件，如果需要重設密碼，請點擊下方按鈕立即跳轉！
          </p>
          <p>如果不記得有申請重設密碼，請忽略此信件。</p>
          <table>
            <tr>
              <td class="centered-content">
                <img
                // TODO: 這裡的圖片連結要更換成 github 上的連結
                  src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/decorate.png"
                  alt="裝飾用圖片"
                />
              </td>
            </tr>
          </table>
          <a
            href="${frontEndUrl}/reset_password/${token}"
            class="button"
            >重設密碼</a
          >
        </div>
      </body>
    </html>
    `
  })
}

/* 寄送帳號啟用信件 */
const sendAccountVerifyEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const frontEndUrl = process.env.FRONTEND_URL

  // 寄信
  await resend.emails.send({
    from: "【104】帳號啟用<onboarding@resend.dev>",
    to: email,
    subject: "【104】帳號啟用信件",
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            background-color: #fff2f2;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #52525b;
          }
          .button {
            background: linear-gradient(96.66deg, #fe839a 9.67%, #4a72ff 112.21%);
            display: block; /* Change to block */
            width: fit-content;
            padding: 10px 20px;
            margin: 20px auto; /* Auto margins for centering */
            color: white !important;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 99999px;
          }
          .button:hover {
            transform: scale(1.05);
          }
          table {
            width: 100%;
          }
          .centered-content {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <img
            // TODO: 這裡的圖片連結要更換成 github 上的連結
              src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/logo.png"
              alt="logo"
            />
          </h1>
          <p>
            這是一封<strong>帳號啟用</strong>的確認信件，如果需要啟用帳號，請點擊下方按鈕立即啟用！
          </p>
          <p>如果不記得有申請此帳號，請忽略此信件。</p>
          <table>
            <tr>
              <td class="centered-content">
                <img
                // TODO: 這裡的圖片連結要更換成 github 上的連結
                  src="https://ixtbnloabxgtkxigyllw.supabase.co/storage/v1/object/public/images/decorate.png"
                  alt="裝飾用圖片"
                />
              </td>
            </tr>
          </table>
          <a
            href="${frontEndUrl}/active_account/${token}"
            class="button"
            >立即啟用</a
          >
        </div>
      </body>
    </html>
    `
  })
}

const resend = {
  sendResetPasswordEmail,
  sendAccountVerifyEmail
}

export default resend
