// Search by business name + address so the map shows the labeled "Sceptre Jiu-Jitsu" place.
const mapsEmbed = 'https://www.google.com/maps?q=Sceptre%20Jiu-Jitsu%2C%203b%20N%20Kingston%20St%2C%20San%20Mateo%2C%20CA%2094401&output=embed'

export function Location() {
  return (
    <div aria-label="Sceptre Jiu-Jitsu on Google Maps">
      <iframe
        src={mapsEmbed}
        width="100%"
        height="480"
        style={{ border: 0, display: 'block', aspectRatio: '16 / 9' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sceptre Jiu-Jitsu location on Google Maps"
      />
    </div>
  )
}
