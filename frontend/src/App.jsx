import { useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

function App() {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    departure_time: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [createdTrip, setCreatedTrip] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setCreatedTrip(null)
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Unable to create trip right now.')
      }

      const trip = await response.json()
      setCreatedTrip(trip)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="card">
        <h1>MergeMiles</h1>
        <p className="tagline">Different routes. Shared miles.</p>

        <form onSubmit={handleSubmit} className="trip-form">
          <label htmlFor="source">From</label>
          <input
            id="source"
            name="source"
            type="text"
            placeholder="Enter starting location"
            value={formData.source}
            onChange={handleChange}
            required
          />

          <label htmlFor="destination">To</label>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="Enter destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <label htmlFor="departure_time">Travel Time</label>
          <input
            id="departure_time"
            name="departure_time"
            type="time"
            value={formData.departure_time}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Find Matches'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {createdTrip && (
          <section className="result" aria-live="polite">
            <h2>Trip created successfully</h2>
            <p>
              <strong>ID:</strong> {createdTrip.id}
            </p>
            <p>
              <strong>From:</strong> {createdTrip.source}
            </p>
            <p>
              <strong>To:</strong> {createdTrip.destination}
            </p>
            <p>
              <strong>Travel Time:</strong> {createdTrip.departure_time}
            </p>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
