import { Component, ErrorInfo, ReactNode } from "react";
import PantallaError from "./componente/error/PantallaError";

interface ErrorBoundaryState {
  hasError: boolean;
  error?:Error;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: undefined,
      errorInfo: undefined
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true,
      error: error,
      errorInfo: undefined
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Error: ', error);
    console.log('Error info: ', errorInfo);
    
    // Actualiza el estado con la información completa del error
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
      <PantallaError
          error={this.state.error} 
          errorInfo={this.state.errorInfo}
        />
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;