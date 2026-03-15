import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    category_id: number;
    title: string;
    content: string;
    is_published: boolean;
    tags: Tag[];
}

interface Props {
    article?: Article;
    categories: Category[];
    tags: Tag[];
}

export default function Form({ article, categories, tags }: Props) {
    const isEditing = !!article;
    
    const { data, setData, post, put, errors, processing } = useForm({
        title: article?.title || '',
        category_id: article?.category_id?.toString() || '',
        content: article?.content || '',
        is_published: article?.is_published || false,
        tags: article?.tags?.map(t => t.id) || [] as number[],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Dashboard'), href: '/dashboard' },
        { title: t('Articles'), href: '/articles' },
        { title: isEditing ? t('Edit Article') : t('Create Article'), href: '#' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/articles/${article.id}`);
        } else {
            post('/articles');
        }
    };

    const toggleTag = (tagId: number) => {
        const currentTags = [...data.tags];
        if (currentTags.includes(tagId)) {
            setData('tags', currentTags.filter(id => id !== tagId));
        } else {
            setData('tags', [...currentTags, tagId]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? t('Edit Article') : t('Create Article')} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-4xl mx-auto w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEditing ? t('Edit Article') : t('Create Article')}</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">{t('Title')}</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder={t('Enter article title')}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">{t('Category')}</Label>
                                    <Select 
                                        value={data.category_id} 
                                        onValueChange={(value) => setData('category_id', value)}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder={t('Select a category')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">{t('Content')}</Label>
                                <textarea
                                    id="content"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder={t('Write your article content here...')}
                                />
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                            </div>

                            <div className="space-y-3">
                                <Label>{t('Tags')}</Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md">
                                    {tags.map((tag) => (
                                        <div key={tag.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`tag-${tag.id}`} 
                                                checked={data.tags.includes(tag.id)}
                                                onCheckedChange={() => toggleTag(tag.id)}
                                            />
                                            <Label htmlFor={`tag-${tag.id}`} className="font-normal cursor-pointer">
                                                {tag.name}
                                            </Label>
                                        </div>
                                    ))}
                                    {tags.length === 0 && <p className="text-sm text-muted-foreground col-span-full">{t('No tags available.')}</p>}
                                </div>
                                {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox 
                                    id="is_published" 
                                    checked={data.is_published}
                                    onCheckedChange={(checked) => setData('is_published', checked === true)}
                                />
                                <Label htmlFor="is_published" className="cursor-pointer">{t('Publish this article')}</Label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline" asChild>
                                <Link href="/articles">{t('Cancel')}</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {isEditing ? t('Update Article') : t('Create Article')}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
