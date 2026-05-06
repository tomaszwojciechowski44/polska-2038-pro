import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#0a0f1e', color: '#00FF88', padding: '2rem', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1 style={{ color: '#ff4444', marginBottom: '1rem' }}>⚠ React Error</h1>
          <pre style={{ background: '#111', padding: '1rem', borderRadius: '4px', overflow: 'auto', color: '#fff', fontSize: '13px' }}>
            {this.state.error?.message}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
)
