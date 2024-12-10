import { RESEND_API } from "$env/static/private";
import { Resend } from "resend";

// This is needed for Vercel to run functions
export const config = {
  runtime: "edge",
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log(data);
    sendEmail(data);
  },
};

const sendEmail = async (data) => {
  // get the name from the form data
  const name = data.get("name");
  const msg = data.get("message");
  const resend = new Resend(RESEND_API);
  const { resp, error } = await resend.emails.send({
    to: "dave@dwedigital.com",
    from: "dave@email.dwedigital.com",
    subject: "Test",
    html: `<h1>${name}</h1>
    <p>${msg}</p>`,
    text: `Name: ${name}\n\nMessage: ${msg}`,
  });

  if (error) {
    console.log(error);
  } else {
    console.log(resp);
  }
};
