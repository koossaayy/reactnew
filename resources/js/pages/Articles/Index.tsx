import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    category?: Category;
    tags: Tag[];
}

interface Props {
    articles: Article[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Articles', href: '/articles' },
];

export default function Index({ articles }: Props) {
    const { t } = useTranslation();
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm(t('Are you sure you want to delete this article?'))) {
            destroy(`/articles/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Articles')} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{t('Articles')}</CardTitle>
                        <Button asChild>
                            <Link href="/articles/create">{t('Create Article')}</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/50">
                                    <tr>
                                        <th className="p-4 text-left font-medium">{t('Title')}</th>
                                        <th className="p-4 text-left font-medium">{t('Category')}</th>
                                        <th className="p-4 text-left font-medium">{t('Tags')}</th>
                                        <th className="p-4 text-left font-medium">{t('Status')}</th>
                                        <th className="p-4 text-right font-medium">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                                {t('No articles found.')}
                                            </td>
                                        </tr>
                                    ) : (
                                        articles.map((article) => {
    const { t } = useTranslation();
    return (
                                            <tr key={article.id} className="border-b">
                                                <td className="p-4 font-medium">{article.title}</td>
                                                <td className="p-4">{article.category?.name || 'N/A'}</td>
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {article.tags.map(tag => (
                                                            <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {article.is_published ? (
                                                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">{t('Published')}</Badge>
                                                    ) : (
                                                        <Badge variant="outline">{t('Draft')}</Badge>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right space-x-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/articles/${article.id}/edit`}>{t('Edit')}</Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                                                        {t('Delete')}
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
})
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
