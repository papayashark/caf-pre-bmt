import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Not Found',
    description: 'Requested page has not been founded. Please check requested URL.',
}

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">404</h1>

            <div className="absolute">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We couldn't find the page you are looking for.
                </p>

                <Link href="/">
                    <button>return</button>
                    <Button size="lg" className="bg-yellow-500 cursor hover:bg-yellow-600 text-gray-900 font-bold px-8 h-14">
                        Return to Homepage
                    </Button>
                </Link>
            </div>
        </div>
    );
}