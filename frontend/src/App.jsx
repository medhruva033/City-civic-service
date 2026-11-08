
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "./styles/pages.css";

/* Import Liquid Glass CSS LAST */
import "./styles/liquid-glass.css";

function App() {
  const handleRipple = (event) => {
    const target = event.target.closest(
      "button, a, .btn, [role='button']"
    );

    if (!target || event.button !== 0) return;

    if (
      target.disabled ||
      target.getAttribute("aria-disabled") === "true"
    ) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");

    ripple.className = "liquid-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;

    ripple.style.left =
      `${event.clientX - rect.left - size / 2}px`;

    ripple.style.top =
      `${event.clientY - rect.top - size / 2}px`;

    target.appendChild(ripple);

    window.setTimeout(() => {
      ripple.remove();
    }, 750);
  };

  return (
    <div onPointerDownCapture={handleRipple}>
      <AppRoutes />
    </div>
  );
}

export default App;
