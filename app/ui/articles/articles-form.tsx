'use client';

import { Article, Category } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { ArticleFormState, createOrUpdateArticle } from '@/app/lib/actions';
import { useActionState, useEffect, useState } from 'react';
import { NumberInput, TextInput } from '../components/form-fields/input';
import Select from '../components/form-fields/select';
import FileChooser from '../components/form-fields/file-chooser';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_IN_BYTES_ALLOWED, MAX_ALLOWED_FILES_AMOUNT } from '@/app/lib/constants';

interface Props {
  categories: Category[];
  currencies: Map<string, string>;
  article?: Article;
}

export default function ArticleForm({ categories, currencies, article }: Props ) {
  const initialState: ArticleFormState = { message: null, errors: {}, formData: {} };
  const [state, formAction] = useActionState(createOrUpdateArticle, initialState);
  const [mediaToRemove, setMediaToRemove] = useState<string>();
  const [formData, setFormData] = useState<any>({});

  const [currency, setCurrency] = useState( article ? article?.currency : 'USD');
  const [category, setCategory] = useState( article ? article?.category.id : categories[0].id);

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);
  
  const categoriesMap = new Map();
  categories.map((category) => (
    categoriesMap.set(category.name, category.id)
  ));
  
  function removeMedia(mediaId: number){
    let filesToRemove = mediaToRemove ? mediaToRemove.split(',') : [];
    filesToRemove.push(mediaId.toString());
    setMediaToRemove(filesToRemove.join(','));
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden input with article id for the edit */}
        {article ? <input type='hidden' value={article.id} id="article_id" name='article_id'/> : null}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="mb-4">
            <TextInput 
              id='name'
              defaultValue={formData.name || article?.name || ''}
              errors={state.errors ? state.errors.name : undefined} 
              icon='DocumentTextIcon' 
              label='Nombre del artículo' />
          </div>

          {/* Category Name */}
          <div className="mb-4">
            <Select 
              id='category' 
              label='Seleccione una categoría'
              icon='TagIcon'
              value={category}
              onChange={(e) => setCategory(e as number)}
              values={categoriesMap} 
              errors={state.errors ? state.errors.categoryId : undefined} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Currency */}
          <div className="mb-4">
            <Select 
            id='currency' 
            label='Seleccione una moneda'
            icon='CurrencyDollarIcon' 
            value={currency}
            onChange={(e) => setCurrency(e as string)}
            values={currencies} 
            errors={state.errors ? state.errors.currency : undefined} />
          </div>

          {/* Price */}
          <div className="mb-4">
            <NumberInput 
              id='price'
              defaultValue={formData.price || article?.price || 0}
              errors={state.errors ? state.errors.price : undefined} 
              icon='CurrencyDollarIcon' 
              label='Precio' 
              step={0.01} 
              min={0}/>
          </div>
        
          {/* Stock */}
          <div className="mb-4 col-span-2">
            <NumberInput 
              id='current_stock'
              defaultValue={formData.current_stock || article?.current_stock || 0}
              errors={state.errors ? state.errors.currentStock : undefined} 
              icon='RectangleStackIcon' 
              label='Stock actual' 
              step={0.01} 
              min={0} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Internal code */}
          <div className="mb-4">
            <TextInput 
              id='internal_code' 
              defaultValue={formData.internal_code || article?.internal_code || ''}
              label='Código interno de identificacion'
              placeholder='Por Ej. SKU o UPC'
              icon='ClipboardDocumentListIcon'
              errors={state.errors ? state.errors.internalCode : undefined}
              />
          </div>
        </div>
        <FileChooser id='article-images'
          removeMediaCallback={removeMedia}
          mediaFiles={formData.media_files || article?.media_files || []}/>
        <input type="hidden" id="images-to-remove" name="images-to-remove" defaultValue={mediaToRemove} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/welcome/articles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
          Cancelar
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
