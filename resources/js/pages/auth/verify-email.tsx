// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import i18next from 'i18next';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title={i18next.t('Verify email')}
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title={i18next.t('Email verification')} />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {i18next.t('A new verification link has been sent to the email address you provided during registration.')}
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            {i18next.t('Resend verification email')}
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            {i18next.t('Log out')}
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
