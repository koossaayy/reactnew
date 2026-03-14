import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import i18next from 'i18next';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: i18next.t('Dashboard'), href: '/dashboard' },
    { title: i18next.t('Categories'), href: '/categories' },
];

export default function Index({ categories }: Props) {
    const { t } = useTranslation();
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm(t('Are you sure you want to delete this category?'))) {
            destroy(`/categories/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Categories')} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{t('Categories')}</CardTitle>
                        <Button asChild>
                            <Link href="/categories/create">{t('Create Category')}</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/50">
                                    <tr>
                                        <th className="p-4 text-left font-medium">{t('Name')}</th>
                                        <th className="p-4 text-left font-medium">{t('Slug')}</th>
                                        <th className="p-4 text-right font-medium">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                                {t('No categories found.')}
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((category) => (
                                            <tr key={category.id} className="border-b">
                                                <td className="p-4">{category.name}</td>
                                                <td className="p-4">{category.slug}</td>
                                                <td className="p-4 text-right space-x-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/categories/${category.id}/edit`}>{t('Edit')}</Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                                                        {t('Delete')}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
