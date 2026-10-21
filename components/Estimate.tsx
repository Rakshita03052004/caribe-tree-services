"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";

type Form = { service: number; size: number; timing: number; name: string; phone: string; address: string; notes: string; pref: number };
const EMPTY: Form = { service: -1, size: -1, timing: -1, name: "", phone: "", address: "", notes: "", pref: 0 };

export default function Estimate() {
  const { t } = useLang();
  const e = t.estimate;
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [done, setDone] = useState(false);

  const canNext =
    (step === 0 && f.service >= 0) ||
    (step === 1 && f.size >= 0) ||
    (step === 2 && f.timing >= 0) ||
    (step === 3 && f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 7);

  const Choice = ({ options, value, onPick }: { options: string[]; value: number; onPick: (i: number) => void }) => (
    <div className="choices">
      {options.map((o, i) => (
        <button
          type="button"
          key={o}
          className={`choice ${value === i ? "on" : ""}`}
          onClick={() => {
            onPick(i);
            setTimeout(() => setStep((s) => Math.min(s + 1, 3)), 220);
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );

  const reset = () => {
    setF(EMPTY);
    setStep(0);
    setDone(false);
  };

  return (
    <section id="estimate" className="section section-alt">
      <div className="wrap narrow">
        <Reveal className="head">
          <p className="eyebrow">{e.eyebrow}</p>
          <h2>{e.title}</h2>
          <p className="sub">{e.sub}</p>
        </Reveal>

        <Reveal className="est">
          {done ? (
            <div className="est-done">
              <div className="check" aria-hidden />
              <h3>{e.doneTitle}</h3>
              <p>{e.doneBody}</p>
              <dl className="est-summary">
                <div><dt>{e.steps[0]}</dt><dd>{t.services.items[f.service]?.name}</dd></div>
                <div><dt>{e.steps[1]}</dt><dd>{e.sizes[f.size]}</dd></div>
                <div><dt>{e.steps[2]}</dt><dd>{e.timing[f.timing]}</dd></div>
                <div><dt>{e.steps[3]}</dt><dd>{f.name} · {f.phone} · {e.prefs[f.pref]}</dd></div>
              </dl>
              <button className="btn btn-link" onClick={reset}>{e.again}</button>
            </div>
          ) : (
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                if (canNext) setDone(true);
              }}
            >
              <div className="progress">
                {e.steps.map((s, i) => (
                  <button
                    type="button"
                    key={s}
                    className={`pstep ${i === step ? "now" : ""} ${i < step ? "past" : ""}`}
                    onClick={() => i < step && setStep(i)}
                  >
                    <span className="bar" />
                    {s}
                  </button>
                ))}
              </div>

              <div className="est-body" key={step}>
                {step === 0 && (
                  <>
                    <h3>{e.q1}</h3>
                    <Choice options={t.services.items.map((s) => s.name)} value={f.service} onPick={(i) => setF({ ...f, service: i })} />
                  </>
                )}
                {step === 1 && (
                  <>
                    <h3>{e.q2}</h3>
                    <Choice options={e.sizes} value={f.size} onPick={(i) => setF({ ...f, size: i })} />
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3>{e.q3}</h3>
                    <Choice options={e.timing} value={f.timing} onPick={(i) => setF({ ...f, timing: i })} />
                  </>
                )}
                {step === 3 && (
                  <>
                    <h3>{e.q4}</h3>
                    <div className="fields">
                      <label className="field">
                        <input value={f.name} onChange={(x) => setF({ ...f, name: x.target.value })} placeholder=" " autoComplete="name" />
                        <span>{e.name}</span>
                      </label>
                      <label className="field">
                        <input value={f.phone} onChange={(x) => setF({ ...f, phone: x.target.value })} placeholder=" " type="tel" autoComplete="tel" />
                        <span>{e.phone}</span>
                      </label>
                      <label className="field full">
                        <input value={f.address} onChange={(x) => setF({ ...f, address: x.target.value })} placeholder=" " autoComplete="street-address" />
                        <span>{e.address}</span>
                      </label>
                      <label className="field full">
                        <textarea value={f.notes} onChange={(x) => setF({ ...f, notes: x.target.value })} placeholder=" " rows={3} />
                        <span>{e.notes}</span>
                      </label>
                    </div>
                    <p className="pref-label">{e.pref}</p>
                    <div className="seg seg-wide" role="group">
                      <span className="seg-thumb" style={{ width: "33.333%", transform: `translateX(${f.pref * 100}%)` }} />
                      {e.prefs.map((p, i) => (
                        <button type="button" key={p} className={f.pref === i ? "on" : ""} onClick={() => setF({ ...f, pref: i })}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="est-nav">
                <button type="button" className="btn btn-link" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                  ‹ {e.back}
                </button>
                {step < 3 ? (
                  <button type="button" className="btn btn-primary" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
                    {e.next}
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled={!canNext}>
                    {e.submit}
                  </button>
                )}
              </div>
            </form>
          )}
        </Reveal>
        <p className="est-alt">
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          <span>·</span>
          <a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
