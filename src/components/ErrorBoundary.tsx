import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  resetKey: string
  onReset: () => void
}

interface ErrorBoundaryState {
  error: Error | null
  prevResetKey: string | undefined
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null, prevResetKey: undefined }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error }
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): Partial<ErrorBoundaryState> | null {
    if (props.resetKey !== state.prevResetKey) {
      return { prevResetKey: props.resetKey, error: null }
    }
    return null
  }

  private handleReset = () => {
    this.setState({ error: null })
    this.props.onReset()
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-md px-4 py-16 text-center">
          <div className="card-chunky rounded-3xl p-8">
            <span aria-hidden="true" className="block text-6xl">
              🦸
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink">
              Oops! A bubble popped!
            </h2>
            <p className="mt-2 text-base font-medium text-ink-soft">
              Something went wrong on this page. Don&apos;t worry — tap below to fly back to the
              Academy!
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="btn-bounce tap-target mt-6 rounded-full px-8 py-4 font-display text-xl font-extrabold text-white shadow-btn"
              style={{ backgroundColor: 'var(--coral)' }}
            >
              🏠 Back to the Academy
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
