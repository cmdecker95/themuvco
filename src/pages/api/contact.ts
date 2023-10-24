import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getXataClient } from "../../xata";

export const POST: APIRoute = async ({ request }) => {
  try {
    // Extract form data
    const body = await request.arrayBuffer();
    const bodyString = new TextDecoder().decode(body);
    const formData = JSON.parse(bodyString);

    const { first, last, email, phone, difficulty, injury } = formData;
    console.log("Form data:", formData);

    // Validate form data
    if (
      typeof first !== "string" ||
      typeof last !== "string" ||
      typeof email !== "string" ||
      typeof difficulty !== "string" ||
      typeof injury !== "string" ||
      first.trim().length < 1 ||
      last.trim().length < 1 ||
      email.trim().length < 1 ||
      difficulty.trim().length < 1 ||
      injury.trim().length < 1
    ) {
      throw new Error("Form data could not be parsed.");
    }

    // Update database
    const prospect = {
      first: first.trim(),
      last: last.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      difficulty: difficulty.trim(),
      injury: injury.trim(),
    };

    const xata = getXataClient();

    const record = await xata.db.prospect
      .create(prospect)
      .catch((error) => console.log(error));

    console.log("From Xata:", record);

    // Send email
    try {
      const resend = new Resend(import.meta.env.RESEND_API_KEY);
      const data = await resend.emails.send({
        from: "The MUV Collective <hello@christiandecker.dev>",
        to: [email],
        subject: "Intake Form Received",
        html: `
        <h1>Hello, ${first} ${last} 👋</h1>
        <p>Thank you for filling out our intake form! One of our physical therapists will reach out within a few business days.</p>
        <p>We will try to contact you via the information you provided:</p>
        <strong>Email: </strong>${email}
        ${phone && `<strong>Phone: </strong>${phone}"`}
        <hr>
        <h2>Your Submission 📝</h2>
        <p><strong>What sport or activity are you having difficulty with?</strong> ${difficulty}</p>
        <p><strong>What is causing you pain or limiting you in that activity?</strong> ${injury}</p>
        `,
      });

      console.log("From Resend:", data);

      return new Response(JSON.stringify({ message: "Success!" }), {
        status: 201,
      });
    } catch (error) {
      console.error("Couldn't send via resend:", error);

      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error processing form data:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
