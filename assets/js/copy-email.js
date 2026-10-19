// Clicking any mailto: link also copies the address, so visitors without a
// default mail app (e.g. Gmail-in-browser users) can still paste it.
(function () {
    function fallbackCopy(text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
    }

    function copy(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
        }
        fallbackCopy(text);
        return Promise.resolve();
    }

    var toast, hideTimer;
    function showToast(email) {
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "email-toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }
        toast.innerHTML = "Email copied<strong></strong><span>Paste it into your mail app if one didn't open.</span>";
        toast.querySelector("strong").textContent = email;
        toast.classList.add("is-visible");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 4500);
    }

    document.addEventListener("click", function (e) {
        var link = e.target.closest && e.target.closest('a[href^="mailto:"]');
        if (!link) return;
        var email = decodeURIComponent(link.getAttribute("href").slice(7).split("?")[0]);
        copy(email).then(function () { showToast(email); });
        // Default action continues, so the mail app still opens when there is one.
    });
})();
