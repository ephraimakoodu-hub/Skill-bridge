import React from "react";

export default function Privacy() {
  return (
    <div className="page-body">
      <div className="container legal-content" style={{ maxWidth: 760 }}>
        <h1>Privacy Policy</h1>
        <p className="text-muted">Last updated: September 2026</p>

        <p className="mt-16">
          This Privacy Policy explains what information SkillBridge NG collects as part of its
          current MVP and how that information is stored.
        </p>

        <h2>1. What we collect</h2>
        <p>When you register, we collect the name, email address and password you provide. As you use the platform, we record your lesson progress, the projects you start or complete, and the opportunities you save.</p>

        <h2>2. How your information is stored</h2>
        <p>
          SkillBridge NG's current version does not use a backend server. All account details and
          activity described above are stored only in your web browser, using a technology called
          localStorage. Nothing is transmitted to us or to any third party. Your password is not
          stored in plain text; it is hashed before being saved in your browser.
        </p>
        <p>
          Because there is no server, this data stays on the device and browser you used to create
          it. It will not appear if you log in from a different browser or device, and it can be
          permanently deleted if you clear your browser's site data or use the delete account option
          in Settings.
        </p>

        <h2>3. What we do not do</h2>
        <ul>
          <li>We do not sell or share your information, because it is never sent to us in the first place.</li>
          <li>We do not use tracking cookies or third-party analytics in this version.</li>
          <li>We do not show advertising.</li>
        </ul>

        <h2>4. Payments</h2>
        <p>
          If you subscribe to Premium, payment is collected through Paystack's own checkout window, not by
          SkillBridge NG directly. We never see or store your card details; Paystack handles that. We do
          receive and store the payment reference Paystack returns after checkout, so we can show it back
          to you in Settings. Because this MVP has no backend, that reference is not independently verified
          against Paystack's records before Premium is unlocked; see the README for the full detail on this
          limitation.
        </p>

        <h2>5. Opportunities listings</h2>
        <p>
          The opportunity listings shown on this platform are sample data used to demonstrate the
          product. Applying through an "Apply" link takes you to an external page that is not
          operated by SkillBridge NG, and this policy does not cover that external site.
        </p>

        <h2>6. Your choices</h2>
        <p>You can edit your profile information, change your password, cancel a Premium subscription, or permanently delete your account and all associated local data at any time from Settings.</p>

        <h2>7. Changes to this policy</h2>
        <p>As SkillBridge NG moves beyond this MVP and introduces a real backend, this policy will be updated to reflect how data is handled on our servers.</p>

        <h2>8. Contact</h2>
        <p>For questions about this policy, reach out through the contact details listed on the SkillBridge NG website.</p>
      </div>
    </div>
  );
}
