import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client('process.env.GOOGLE_CLIENT_ID');  // Replace with your actual Client ID

export async function verifyToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: 'process.env.GOOGLE_CLIENT_ID',  // This should match your Client ID
    });
    const payload = ticket.getPayload();
    console.log('Token verified. Payload:', payload);
  } catch (error) {
    console.error('Error verifying token:', error);
  }
}

// Example token
const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2NGZlYWNlYzNlYmRmYWE3MzExYjlkOGU3M2M0MjgxOGYyOTEyNjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0MjA2ODM4OTMyMTU4NTQzOTYiLCJlbWFpbCI6InJhbWVzaHNlZXJhbmdhbjcwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiXzVQRGg4d2JnTk5UTUthOWZZVjJUZyIsImlhdCI6MTczNDcwMTA0MywiZXhwIjoxNzM0NzA0NjQzfQ.JSb1u5NRUXfcP9J9lkklaIzN8n2VDo_NxtFNdT2jeIjFKda-twjV5E9gMHGkYcCjWIVet2qZbm7rUqZPRMPUm62otTNU8v8THVdJHkH5TTOQJgm7eAkaJeWLcLtM3AkqXAh5rsU9WTeLz2VfyWYiLpgKiMPDHFaHYuLf7RkdYPIAgcTrkjV3vZIEKZgfMzFTSu_iZqbnudx-LKpqOrkAcWXOPmkelRfZOr4pqviIvsR7iJCmEEcdVZDfHczL7f-Mg5SqpCMpAAoqpR5wYZ63BNZAvQTfUcKyqBCDA_FLx7GOxYAY8ZNkaeZoRbWbt9Ctjgei9Dzu8E4PHCvHkuvHKw"';
verifyToken(idToken);
