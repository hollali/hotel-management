import { Resend } from "resend";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

type SendBookingConfirmationInput = {
  to: string;
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: string;
  bookingId: string;
};

export async function sendBookingConfirmation(input: SendBookingConfirmationInput) {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: "Sky Inn Hotel <bookings@skyinnhotel.com>",
      to: input.to,
      subject: "Booking Confirmed - Sky Inn Hotel",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #02102A;">Booking Confirmed!</h1>
          <p>Dear ${input.guestName},</p>
          <p>Your booking at Sky Inn Hotel has been confirmed.</p>

          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #999FAA;">Room</td>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #02102A;">${input.roomName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #999FAA;">Check-In</td>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #02102A;">${input.checkIn}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #999FAA;">Check-Out</td>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #02102A;">${input.checkOut}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #999FAA;">Total</td>
              <td style="padding: 12px; border-bottom: 1px solid #D9DBDF; color: #02102A;">GHS ${input.totalPrice}</td>
            </tr>
            <tr>
              <td style="padding: 12px; color: #999FAA;">Booking ID</td>
              <td style="padding: 12px; color: #02102A;">${input.bookingId}</td>
            </tr>
          </table>

          <p style="color: #999FAA; font-size: 14px;">
            If you have any questions, please contact us at hollali@example.com or call +233 0243658631.
          </p>

          <p style="color: #999FAA; font-size: 14px;">We look forward to welcoming you!</p>
          <p style="color: #02102A;">Sky Inn Hotel Team</p>
        </div>
      `,
    });
  } catch {
    // silently fail - email is non-critical
  }
}

export async function sendBookingCancellation(to: string, roomName: string) {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: "Sky Inn Hotel <bookings@skyinnhotel.com>",
      to,
      subject: "Booking Cancelled - Sky Inn Hotel",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #02102A;">Booking Cancelled</h1>
          <p>Your booking for <strong>${roomName}</strong> has been cancelled as requested.</p>
          <p style="color: #999FAA; font-size: 14px;">If you have any questions, please contact us.</p>
          <p style="color: #02102A;">Sky Inn Hotel Team</p>
        </div>
      `,
    });
  } catch {
    // silently fail
  }
}
