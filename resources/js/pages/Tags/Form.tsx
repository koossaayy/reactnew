import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Tag {
    id: number;
    name: string;
}

interface Props {
    tag?: Tag;
}

export default function Form({ tag }: Props) {
    const { t } = useTranslation();
    const isEditing = !!tag;
    const { data, setData, post, put, errors, processing } = useForm({
        name: tag?.name || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Dashboard'), href: '/dashboard' },
        { title: t('Tags'), href: '/tags' },
        { title: isEditing ? t('Edit Tag') : t('Create Tag'), href: '#' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/tags/${tag.id}`);
        } else {
            post('/tags');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? t('Edit Tag') : t('Create Tag')} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEditing ? t('Edit Tag') : t('Create Tag')}</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('Name')}</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder={t('Enter tag name')}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href="/tags">{t('Cancel')}</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {isEditing ? 'Update Tag' : t('Create Tag')}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
