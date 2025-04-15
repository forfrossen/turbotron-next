"use client";
import {isNil} from "lodash";
import {Component, ErrorInfo, ReactNode, Suspense} from "react";

export class ErrorBoundary extends Component<{children: ReactNode; fallback: ReactNode}> {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

export function withErrorBoundary<P extends object>(Component: React.ComponentType<P>, fallback?: ReactNode) {
  return function WrappedComponent(props: P) {
    const errorFallback = isNil(fallback) ? <DefaultErrorFallback /> : fallback;
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export function withSuspense<P extends object>(Component: React.ComponentType<P>, fallback?: ReactNode) {
  return function WrappedComponent(props: P) {
    const loadingFallback = isNil(fallback) ? <DefaultLoadingFallback /> : fallback;
    return (
      <Suspense fallback={loadingFallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}

export function DefaultErrorFallback() {
  return <div>Error loading component</div>;
}

export function DefaultLoadingFallback() {
  return <div>Loading...</div>;
}

export function withErrorBoundaryAndSuspense<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode,
  loadingFallback?: ReactNode
) {
  const WrappedComponent = withErrorBoundary(Component, errorFallback);
  return withSuspense(WrappedComponent, loadingFallback);
}
