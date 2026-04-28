import Magnetix from "../src/index.js";

function createFeedback(config = {}) {
    const {
        endpoint = null,
        label = "FB",
    } = config;

    const overlay = document.createElement("div");
    overlay.className = "fb-overlay";

    const trigger = document.createElement("button");
    trigger.className = "fb-trigger";
    trigger.setAttribute("aria-label", "Open feedback");
    trigger.innerHTML = `
        <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- diamond -->
            <rect x="0" y="0" width="30" height="30" transform="rotate(45 10 12)" fill="white"></rect>
        </svg>
    `;

    const panel = document.createElement("div");
    panel.className = "fb-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Feedback");
    panel.innerHTML = `
        <div class="fb-header">
            <div>
                <div class="fb-header__eyebrow">Magnetix</div>
                <div class="fb-header__title">Share feedback</div>
            </div>
            <button class="fb-close" aria-label="Close">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 1l9 9M10 1L1 10"
                        stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
            </button>
        </div>

        <div class="fb-form-inner" id="fbFormInner">

            <div class="fb-label">How would you rate it?</div>
            <div class="fb-rating" id="fbRating">
                <button class="fb-star" data-value="1">1</button>
                <button class="fb-star" data-value="2">2</button>
                <button class="fb-star" data-value="3">3</button>
                <button class="fb-star" data-value="4">4</button>
                <button class="fb-star" data-value="5">5</button>
            </div>

            <div class="fb-label">Reason</div>
            <div class="fb-types" id="fbTypes">
                <button class="fb-type active" data-value="general">General</button>
                <button class="fb-type" data-value="bug">Bug</button>
                <button class="fb-type" data-value="feature">Feature</button>
                <button class="fb-type" data-value="performance">Performance</button>
            </div>

            <div class="fb-divider"></div>

            <div class="fb-field">
                <div class="fb-label">Message</div>
                <textarea class="fb-textarea" id="fbMessage"
                        placeholder="What's on your mind?"></textarea>
                <div class="fb-error" id="fbError">Please write a message first.</div>
            </div>

            <div class="fb-field">
                <div class="fb-label">Email — optional</div>
                <input type="email" class="fb-input" id="fbEmail"
                    placeholder="you@example.com" />
            </div>
        </div>

        <div class="fb-success" id="fbSuccess">
            <div class="fb-success__ring">
                <svg viewBox="0 0 24 24" fill="none"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <div class="fb-success__title">Thank you</div>
            <div class="fb-success__body">
                Your feedback was sent.<br/>It means a lot.
            </div>
        </div>

        <div class="fb-footer">
            <div class="fb-error" id="fbErrorFooter"></div>
            <button class="fb-submit" id="fbSubmit">Send feedback</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    trigger.style.transform = "translateY(-50%)";

    let isOpen = false;
    let rating = 0;
    let type = "general";
    let slideTimeline = null;

    const magneticTimeline = new Magnetix.Timeline();
    const mag = Magnetix.magnetic(".fb-trigger", {
        strength: 0.35,
        maxDistance: 90,
    });
    const drag = Magnetix.drag(".fb-trigger")
    magneticTimeline.add(mag, drag);
    magneticTimeline.play();

    trigger.addEventListener("pointerup", (e) => {
        isOpen ? close() : open();
    }
    );

    function animatePanel(toOpen) {
        if (slideTimeline) {
            slideTimeline.pause();
            slideTimeline = null;
        }

        const currentX = getTranslateX(panel);
        const targetX = toOpen ? 0 : panel.offsetWidth;

        const anim = Magnetix.createAnimation({
            from: currentX,
            to: targetX,
            duration: 400,
            easing: toOpen
                ? Magnetix.Easings.easeOutCubic
                : Magnetix.Easings.easeInCubic,
            onUpdate(x) {
                panel.style.transform = `translateX(${x}px)`;
            },
        });

        slideTimeline = new Magnetix.Timeline();
        slideTimeline.add(anim);
        slideTimeline.play();
    }

    function getTranslateX(el) {
        return new DOMMatrix(getComputedStyle(el).transform).m41;
    }
    function open() {
        isOpen = true;
        overlay.classList.add("is-visible");
        trigger.setAttribute("aria-expanded", "true");
        animatePanel(true);
    }

    function close() {
        isOpen = false;
        overlay.classList.remove("is-visible");
        trigger.setAttribute("aria-expanded", "false");
        animatePanel(false);
        setTimeout(reset, 420);
    }

    overlay.addEventListener("click", close);
    panel.querySelector(".fb-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) close();
    });

    panel.querySelectorAll(".fb-star").forEach((star) => {
        star.addEventListener("click", () => {
            rating = Number(star.dataset.value);
            panel.querySelectorAll(".fb-star").forEach((s) => {
                s.classList.toggle("active", Number(s.dataset.value) <= rating);
            });
        });
    });

    panel.querySelectorAll(".fb-type").forEach((btn) => {
        btn.addEventListener("click", () => {
            type = btn.dataset.value;
            panel.querySelectorAll(".fb-type").forEach((b) => {
                b.classList.toggle("active", b === btn);
            });
        });
    });

    const submitBtn = panel.querySelector("#fbSubmit");
    const errorEl = panel.querySelector("#fbError");
    const messageEl = panel.querySelector("#fbMessage");
    const emailEl = panel.querySelector("#fbEmail");
    const successEl = panel.querySelector("#fbSuccess");
    const formInner = panel.querySelector("#fbFormInner");
    const fbFooter = panel.querySelector(".fb-footer");

    submitBtn.addEventListener("click", async () => {
        const message = messageEl.value.trim();

        if (!message) {
            errorEl.classList.add("is-visible");
            messageEl.focus();
            return;
        }
        errorEl.classList.remove("is-visible");

        const payload = {
            rating,
            type,
            message,
            email: emailEl.value.trim() || null,
        };

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {
            if (endpoint) {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error("Request failed");
            } else {
                console.log("[Magnetix Feedback]", payload);
                await new Promise((r) => setTimeout(r, 500));
            }

            formInner.style.display = "none";
            fbFooter.style.display = "none";
            successEl.classList.add("is-visible");

            setTimeout(() => {
                close();
            }, 3000);

        } catch (err) {
            console.error("[Magnetix Feedback] send failed:", err);
            submitBtn.disabled = false;
            submitBtn.textContent = "Send feedback";
            errorEl.textContent = "Something went wrong. Try again.";
            errorEl.classList.add("is-visible");
        }
    });

    function reset() {
        rating = 0;
        type = "general";
        messageEl.value = "";
        emailEl.value = "";
        submitBtn.disabled = false;
        submitBtn.textContent = "Send feedback";
        errorEl.classList.remove("is-visible");
        panel.querySelectorAll(".fb-star").forEach((s) => s.classList.remove("active"));
        panel.querySelectorAll(".fb-type").forEach((b) => {
            b.classList.toggle("active", b.dataset.value === "general");
        });
        formInner.style.display = "";
        fbFooter.style.display = "";
        successEl.classList.remove("is-visible");
    }

    return { open, close, reset };
}

export default createFeedback;