# **App Name**: Blue Carbon MRV App

## Core Features:

- Project Registration: Allows project developers (with the DEVELOPER_ROLE) to register blue carbon projects, including details such as location, name, and baseline carbon measurements.
- Data Upload: Enables authorized users (developers and verifiers) to upload data related to carbon sequestration, including data hashes and sequestration delta values.
- Data Verification: Allows verifiers (with VERIFIER_ROLE) to verify uploaded data, ensuring its accuracy and reliability.  LLM tool analyzes uploaded data and flags for potential inaccuracies to aid the verifier in the verification process.
- Credit Calculation and Minting: Calculates carbon credits based on verified data and mints corresponding CarbonCreditNFT tokens, managed by authorized verifiers.  Sequestration values are run through an AI model tool to provide recommended 'factor' values that promote fair market values based on the blue carbon source type and other market forces.
- Stakeholder Onboarding: Facilitates the onboarding of various stakeholders (NGOs, communities, coastal panchayats) by assigning them appropriate roles (ADMIN_ROLE, VERIFIER_ROLE, DEVELOPER_ROLE).
- Credit Retirement: Allows credit owners to retire (burn) CarbonCreditNFT tokens, representing the removal of carbon credits from circulation.
- Project & Data Audit: Enables retrieval of project details and data records for transparency and auditing purposes, enhancing trust and accountability.

## Style Guidelines:

- Background color: Light gray (#F5F5F5) for a clean, modern look, evoking a sense of environmental friendliness without being overly literal.
- Primary color: Deep blue-green (#2E8B57) to represent the blue carbon ecosystems (mangroves, etc.) while still remaining visually appealing and professional.
- Accent color: Soft yellow (#F0E68C) as a subtle accent color, used sparingly for highlights and interactive elements.
- Body and headline font: 'PT Sans', sans-serif, combines a modern look with a touch of warmth, suitable for both headlines and body text.
- Use clear, professional icons to represent project registration, data upload, verification, and credit minting.
- Design a responsive layout that adapts to different screen sizes (desktop, tablet, mobile) for seamless data input in the field.
- Incorporate subtle transitions and animations to enhance user experience, such as progress bars during data upload and confirmations upon successful verification.