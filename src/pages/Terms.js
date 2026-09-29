import React from "react";

export default function Terms() {
  return (
    <div className="page-body">
      <div className="container legal-content" style={{ maxWidth: 760 }}>
        <h1>Terms &amp; Conditions</h1>
        <p className="text-muted">Last updated: September 2026</p>

        <p className="mt-16">By creating an account or otherwise using SkillBridge NG, you agree to these terms.</p>

        <h2>1. The service</h2>
        <p>
          SkillBridge NG is an MVP learning platform. It provides skill roadmaps, guided projects,
          a personal showcase, and a list of sample opportunity listings. Features may change,
          and some functionality described as a future improvement is not yet available.
        </p>

        <h2>2. Accounts</h2>
        <p>
          You are responsible for the accuracy of the information you provide and for keeping your
          password confidential. Because this MVP stores data only in your browser, you are also
          responsible for keeping your own device secure; SkillBridge NG cannot recover a lost
          account if your browser data is cleared.
        </p>

        <h2>3. Acceptable use</h2>
        <ul>
          <li>Do not use the platform to submit unlawful, abusive or infringing content.</li>
          <li>Do not attempt to interfere with the platform's normal operation.</li>
          <li>Do not misrepresent your identity when applying to a listed opportunity.</li>
        </ul>

        <h2>4. Content you submit</h2>
        <p>
          Notes, checklist entries and project details you add remain yours. By completing a project
          and adding it to your showcase, you agree that the showcase page may be viewed by anyone
          you share the link with.
        </p>

        <h2>5. Premium subscription and payments</h2>
        <p>
          Premium is a one-time paid upgrade processed through Paystack. By subscribing, you authorize a
          charge of the amount shown on the Subscribe page at the time of checkout. Because this MVP has no
          backend to verify payments, access is granted directly in your browser once Paystack confirms the
          charge to this page; it does not create a recurring or automatically renewing subscription. You
          can cancel Premium access at any time from Settings, which re-locks Premium content immediately.
          Refund requests should be directed through the contact details on the SkillBridge NG website; we
          do not guarantee a refund and each request is reviewed individually.
        </p>

        <h2>6. Opportunity listings</h2>
        <p>
          Opportunity listings are provided for demonstration and discovery purposes. SkillBridge NG
          does not guarantee the accuracy of any listing and is not a party to any application,
          interview or hiring decision made by a listed organization.
        </p>

        <h2>7. No warranty</h2>
        <p>
          SkillBridge NG is provided as-is, as an MVP, without warranties of any kind. We do not
          guarantee that the service will be uninterrupted, error-free, or fit for any particular
          purpose.
        </p>

        <h2>8. Changes</h2>
        <p>We may update these terms as the platform develops. Continued use after a change means you accept the updated terms.</p>

        <h2>9. Contact</h2>
        <p>Questions about these terms can be sent through the contact details listed on the SkillBridge NG website.</p>
      </div>
    </div>
  );
}
