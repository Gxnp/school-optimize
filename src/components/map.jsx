import React from 'react'

function Map() {
  return (
    <div className="pb-10">
        <div className="overflow-hidden rounded-lg  flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7749.544352500672!2d100.861638!3d13.792603!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6ee9379d593b%3A0x1403e35d6afce1bf!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4LmA4LiV4Lij4Li14Lii4Lih4Lit4Li44LiU4Lih4Lio4Li24LiB4Lip4LiyIOC4quC4uOC4p-C4tOC4meC4l-C4p-C4h-C4qOC5jA!5e0!3m2!1sth!2sus!4v1727163541499!5m2!1sth!2sus"
            width="70%"
            height="450"
            style={{ border: 0, borderRadius: 20 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
  )
}

export default Map