const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 mainpage">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Get In Touch
            </h2>
            <p className="text-gray-600">
              We'd love to hear from you! Whether you have a question, feedback,
              or just want to say hello, feel free to reach out.
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700">Email</h3>
              <p className="text-gray-600">info@example.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Phone</h3>
              <p className="text-gray-600">+62 812 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Address</h3>
              <p className="text-gray-600">
                Jl. Margahayu Permai No. 123, Kota Bandung, Negara Indonesia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() =>
                    window.open(
                      `mailto:info@example.com?subject=Message from ${
                        document.querySelector<HTMLInputElement>('#name')?.value
                      }&body=${
                        document.querySelector<HTMLTextAreaElement>('#message')
                          ?.value
                      }`,
                      '_blank'
                    )
                  }
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
