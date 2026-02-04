import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="glass mt-auto py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Made with ❤️ by <strong style={{ color: 'var(--color-text-primary)' }}>Dhruv Singhania</strong>
                    </p>
                    <Link
                        to="/"
                        className="text-sm font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        TaskFlow
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
