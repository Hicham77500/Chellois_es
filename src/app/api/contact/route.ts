import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, telephone, sujet, message } = body;

    // Validation des champs requis
    if (!nom || !prenom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Envoi de l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "contact@example.com",
      replyTo: email,
      subject: `[Contact Site] ${sujet}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message de contact</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #7c3aed 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #dc2626; margin-top: 0; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                  Informations du contact
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                      <strong style="color: #555;">Nom :</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                      ${nom} ${prenom}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                      <strong style="color: #555;">Email :</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                      <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  ${
                    telephone
                      ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                      <strong style="color: #555;">Téléphone :</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                      ${telephone}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td style="padding: 10px 0;">
                      <strong style="color: #555;">Sujet :</strong>
                    </td>
                    <td style="padding: 10px 0;">
                      ${sujet}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #dc2626; margin-top: 0; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                  Message
                </h2>
                <p style="white-space: pre-wrap; margin: 0; color: #333; line-height: 1.6;">
                  ${message}
                </p>
              </div>

              <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>Note :</strong> Pour répondre à ce message, utilisez directement l'adresse email du contact : ${email}
                </p>
              </div>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px;">
              <p>Cet email a été envoyé depuis le formulaire de contact du site web</p>
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} Chelloises - Tous droits réservés</p>
            </div>
          </body>
        </html>
      `,
      text: `
Nouveau message de contact

INFORMATIONS DU CONTACT
------------------------
Nom : ${nom} ${prenom}
Email : ${email}
${telephone ? `Téléphone : ${telephone}` : ""}
Sujet : ${sujet}

MESSAGE
-------
${message}

---
Pour répondre à ce message, utilisez directement l'adresse email du contact : ${email}
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Email envoyé avec succès",
        id: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors du traitement de la requête" },
      { status: 500 }
    );
  }
}
