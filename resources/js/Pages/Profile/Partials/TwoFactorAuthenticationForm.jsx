import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function TwoFactorAuthenticationForm({ confirmsTwoFactorAuthentication }) {
    const user = usePage().props.auth.user;
    const [enabling, setEnabling] = useState(false);
    const [disabling, setDisabling] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [setupKey, setSetupKey] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [confirming, setConfirming] = useState(false);
    const [code, setCode] = useState('');
    const { errors } = useForm({});

    const enable = () => {
        setEnabling(true);
        router.post(route('two-factor.enable'), {}, {
            preserveScroll: true,
            onSuccess: () => Promise.all([
                showQrCode(),
                showSetupKey(),
                showRecoveryCodes(),
            ]),
            onFinish: () => {
                setEnabling(false);
                setConfirming(true);
            },
        });
    };

    const showQrCode = () => {
        return fetch(route('two-factor.qr-code')).then((res) => res.json()).then((data) => setQrCode(data.svg));
    };

    const showSetupKey = () => {
        return fetch(route('two-factor.secret-key')).then((res) => res.json()).then((data) => setSetupKey(data.secretKey));
    };

    const showRecoveryCodes = () => {
        return fetch(route('two-factor.recovery-codes')).then((res) => res.json()).then((data) => setRecoveryCodes(data));
    };

    const confirm = () => {
        router.post(route('two-factor.confirm'), { code }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setConfirming(false),
            onError: () => setCode(''),
            onFinish: () => setConfirming(true),
        });
    };

    const disable = () => {
        setDisabling(true);
        router.delete(route('two-factor.disable'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisabling(false);
                setConfirming(false);
                setQrCode(null);
                setSetupKey(null);
                setRecoveryCodes([]);
            },
        });
    };

    const regenerateCodes = () => {
        router.post(route('two-factor.regenerate-recovery-codes'), {}, {
            preserveScroll: true,
            onSuccess: () => showRecoveryCodes(),
        });
    };

    if (!user?.two_factor_enabled) {
        return (
            <form>
                <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="mt-1 text-sm text-gray-600">Add additional security using an authenticator app.</p>
                <div className="mt-4">
                    <PrimaryButton type="button" onClick={enable} disabled={enabling}>Enable</PrimaryButton>
                </div>
            </form>
        );
    }

    return (
        <form>
            <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
            <p className="mt-1 text-sm text-gray-600">Two-factor authentication is enabled.</p>
            {confirming && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">Finish enabling by entering the code from your authenticator app.</p>
                    <div className="mt-4">
                        <TextInput value={code} onChange={(e) => setCode(e.target.value)} className="mt-1 block w-1/2" placeholder="Code" />
                        <InputError message={errors.code} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <PrimaryButton onClick={confirm}>Confirm</PrimaryButton>
                    </div>
                </div>
            )}
            <div className="mt-4">
                {qrCode && (
                    <div className="mb-4">
                        <p className="font-medium text-sm text-gray-900">Scan this QR code:</p>
                        <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                    </div>
                )}
                {setupKey && (
                    <div className="mb-4">
                        <p className="font-medium text-sm text-gray-900">Setup Key: {setupKey}</p>
                    </div>
                )}
                {recoveryCodes.length > 0 && (
                    <div>
                        <p className="font-medium text-sm text-gray-900">Store these recovery codes:</p>
                        <div className="mt-2 grid gap-1 max-w-xl">
                            {recoveryCodes.map((code) => <p key={code} className="font-mono text-sm">{code}</p>)}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 flex gap-3">
                {recoveryCodes.length > 0 && <SecondaryButton type="button" onClick={regenerateCodes}>Regenerate Recovery Codes</SecondaryButton>}
                {recoveryCodes.length === 0 && <SecondaryButton type="button" onClick={showRecoveryCodes}>Show Recovery Codes</SecondaryButton>}
                <SecondaryButton type="button" onClick={disable} disabled={disabling}>Disable</SecondaryButton>
            </div>
        </form>
    );
}
