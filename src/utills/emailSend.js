import emailjs from "emailjs-com";

// Initialize EmailJS with your user ID
emailjs.init("oowT_5vUp_ahDqQgI");

// Create a separate function to send the email
export async function sendEmail(toName, toEmail, orderDetails,orderid) {
  try {
    await emailjs.send("service_nyusr78", "template_8ew9hfa", {
      to_name: toName,
      to_email: toEmail,
      order_details: orderDetails,
      order_id:orderid,
    });
    console.log("Email successfully sent!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
