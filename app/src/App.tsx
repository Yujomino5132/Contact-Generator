import { useState, useEffect } from 'react';

function App() {
	const [contact, setContact] = useState('Loading...');
	const [copyIcon, setCopyIcon] = useState('📋');
	const [includeEmail, setIncludeEmail] = useState(true);
	const [includePhone, setIncludePhone] = useState(true);
	const [includeAddress, setIncludeAddress] = useState(false);

	const fetchContact = async () => {
		try {
			const backendUrl = import.meta.env.VITE_OPTIONAL_BACKEND_URL || '';
			const baseUrl = backendUrl ? backendUrl : '';
			const params = new URLSearchParams({
				includeEmail: includeEmail.toString(),
				includePhone: includePhone.toString(),
				includeAddress: includeAddress.toString(),
			});

			const response = await fetch(`${baseUrl}/api/contact?${params}`);
			const data = await response.json();
			setContact(JSON.stringify(data, null, 2) || 'Error fetching contact');
		} catch (error) {
			console.error('Error fetching contact:', error);
			setContact('Error fetching contact');
		}
	};

	useEffect(() => {
		fetchContact();
	}, []);

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopyIcon('✔');
				setTimeout(() => setCopyIcon('📋'), 2000);
			})
			.catch((err) => {
				console.error('Failed to copy contact:', err);
			});
	};

	return (
		<div className="flex flex-col items-center p-5 min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
				<h2 className="text-2xl font-bold text-center mb-6">
					Contact Generator
				</h2>

				<div className="mb-6">
					<label className="block mb-2 font-semibold text-gray-700">
						Generated Contact:
					</label>
					<div className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 font-mono text-xs break-all flex items-start justify-between">
						<pre className="flex-grow whitespace-pre-wrap">{contact}</pre>
						<button
							onClick={() => copyToClipboard(contact)}
							className="ml-3 text-2xl hover:bg-gray-200 p-1 rounded flex-shrink-0"
						>
							{copyIcon}
						</button>
					</div>
				</div>

				<button
					onClick={fetchContact}
					className="w-full mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Generate New Contact
				</button>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						<input
							type="checkbox"
							checked={includeEmail}
							onChange={(e) => setIncludeEmail(e.target.checked)}
							className="mr-2"
						/>
						Include Email
					</label>
				</div>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						<input
							type="checkbox"
							checked={includePhone}
							onChange={(e) => setIncludePhone(e.target.checked)}
							className="mr-2"
						/>
						Include Phone
					</label>
				</div>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						<input
							type="checkbox"
							checked={includeAddress}
							onChange={(e) => setIncludeAddress(e.target.checked)}
							className="mr-2"
						/>
						Include Address
					</label>
				</div>
			</div>

			<div className="mt-8 text-center">
				<p className="text-gray-600">
					For more details on the API, please visit the{' '}
					<a
						href={`${import.meta.env.VITE_OPTIONAL_BACKEND_URL || ''}/docs`}
						target="_blank"
						className="text-blue-600 hover:underline"
					>
						OpenAPI documentation
					</a>
					.
				</p>
			</div>
		</div>
	);
}

export default App;
