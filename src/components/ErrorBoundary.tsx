import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 text-center">
        <div className="max-w-lg">
          <p className="mb-3 font-display text-4xl font-semibold text-[#d5b57a]">Щось пішло не так</p>
          <h1 className="mb-4 font-display text-2xl font-semibold text-white">
            Сторінка не завантажилася
          </h1>
          <p className="mb-7 text-base leading-relaxed text-[#aab3c2]">
            Оновіть сторінку — або зателефонуйте нам, якщо проблема повторюється.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex min-h-12 items-center justify-center bg-[#2f66f5] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#4a7bff]"
            >
              Оновити сторінку
            </button>
            <a
              href="tel:+380671050555"
              className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d5b57a]"
            >
              +38 (067) 105 05 55
            </a>
          </div>
        </div>
      </div>
    );
  }
}
