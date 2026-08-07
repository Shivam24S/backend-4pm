const welcomeEmailTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Welcome to MealDash</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding: 40px 15px;">

              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  width: 100%;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >

                <!-- Header -->
                <tr>
                  <td style="
                    background-color: #e23744;
                    padding: 30px;
                    text-align: center;
                  ">
                    <h1 style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 32px;
                    ">
                      🍽️ MealDash
                    </h1>

                    <p style="
                      margin: 8px 0 0;
                      color: #ffffff;
                      font-size: 14px;
                    ">
                      Delicious food, delivered to your door
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 35px;">

                    <h2 style="
                      margin: 0 0 20px;
                      color: #222222;
                      font-size: 26px;
                    ">
                      Welcome, ${userName}! 🎉
                    </h2>

                    <p style="
                      margin: 0 0 15px;
                      color: #555555;
                      font-size: 16px;
                      line-height: 1.6;
                    ">
                      We're excited to have you join <strong>MealDash</strong>.
                    </p>

                    <p style="
                      margin: 0 0 25px;
                      color: #555555;
                      font-size: 16px;
                      line-height: 1.6;
                    ">
                      Discover your favorite restaurants, explore delicious
                      meals, and get your food delivered straight to your door.
                    </p>

                    <!-- Button -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="
                          background-color: #e23744;
                          border-radius: 6px;
                        ">
                          <a
                            href="#"
                            style="
                              display: inline-block;
                              padding: 14px 28px;
                              color: #ffffff;
                              text-decoration: none;
                              font-size: 16px;
                              font-weight: bold;
                            "
                          >
                            Explore MealDash
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 30px 0 0;
                      color: #777777;
                      font-size: 14px;
                      line-height: 1.6;
                    ">
                      Thank you for choosing MealDash. We hope you enjoy
                      your experience! ❤️
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    background-color: #f8f8f8;
                    padding: 25px;
                    text-align: center;
                  ">

                    <p style="
                      margin: 0 0 8px;
                      color: #777777;
                      font-size: 13px;
                    ">
                      © ${new Date().getFullYear()} MealDash
                    </p>

                    <p style="
                      margin: 0;
                      color: #999999;
                      font-size: 12px;
                    ">
                      Made with ❤️ for food lovers.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
};


export default welcomeEmailTemplate