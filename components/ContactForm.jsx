"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { eeBase, siteBase } from "@/lib/constants";

export function ContactForm() {
  const [mailSent, setMailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    await fetch(eeBase, {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then(({ status }) => {
        if (status === "ok") {
          for (const [key, value] of formData.entries()) {
            if (key === "name") setMailSent(`Email od ${value} byl odeslán`);
          }
        }
      });

    setIsSubmitting(false);
  };

  return (
    <form
      method="post"
      action={eeBase}
      onSubmit={handleSubmit}
      className="contactForm"
    >
      <div className="hiddenFields">
        <input type="hidden" name="ACT" value="33" />
        <input
          type="hidden"
          name="parameters"
          value="VY3HfUw/5LiQmHU6oglnQXobNiPZ5K1edAiGyI1TVdpHx3EUYSl/lusSaW5TS/Osbfku5v8oc2hcWUk7KZrETbyHEcw3iZIGHAYzERVQUWb8Dh2uALMl2NRNQMcwTw//cMB4d3g6X58NGmdOHQyklw=="
        />
        <input type="hidden" name="site_id" value="1" />
        <input
          type="hidden"
          name="url"
          value={siteBase + pathname.slice(1)}
        />
      </div>
      {!Boolean(mailSent) && (
        <div className={isSubmitting ? "submiting" : undefined}>
          <div className="form-group">
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              placeholder="Vaše jméno"
              minLength={6}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Váš email"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              className="form-control"
              id="message"
              rows="3"
              placeholder="Vaše zpráva"
              required
              minLength={10}
            />
          </div>
        </div>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={Boolean(isSubmitting)}
      >
        {Boolean(mailSent) ? mailSent : isSubmitting ? "..." : "Odeslat"}
      </button>
    </form>
  );
}
