{extends file="catalog/index.tpl"}
{block name="title"}{seo_rewrite config_param=['level'=>'1','idmetas'=>'1','default'=>$cat.name]  category=$cat.name}{/block}
{block name="description"}{seo_rewrite config_param=['level'=>'1','idmetas'=>'2','default'=>$cat.name] category=$cat.name}{/block}
{block name='body:id'}catalog-cat{/block}

{block name="article:content"}
    {* Category's Description *}
    <h1 itemprop="name">{$cat.name|ucfirst}</h1>
    <div class="desc clearfix" itemprop="description">
        {if isset($cat.imgSrc.medium)}
            <figure class="col-sm-3 pull-right" itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
                <meta itemprop="contentUrl" content="{$cat.imgSrc.large}" />
                <a href="{$cat.imgSrc.large}" class="img-zoom" title="{$cat.name}" itemprop="thumbnail" itemscope itemtype="http://schema.org/ImageObject">
                    <img src="{$cat.imgSrc.medium}" alt="{$cat.name}" class="img-responsive" itemprop="contentUrl"/>
                </a>
            </figure>
        {/if}
        {$cat.content}
    </div>

    {* Category's Subcategories *}
    {widget_catalog_data
        conf =[
            'context' =>  'subcategory',
            'sort'      => ['order'=>'DESC']
            ]
        assign='subCategoryData'
    }
    {if $subCategoryData != null}
        <section>
            <h3>Sous-Catégorie</h3>
            <div class="subcategory-list row">
                {include file="catalog/loop/category.tpl" data=$subCategoryData effect="ming" classCol="col-xs-6 col-sm-4 col-md-3 col-xl-2" truncate=100}
            </div>
        </section>
    {/if}
    <hr>

    {* Category's Products *}
    {widget_catalog_data
        conf =[
            'context'   =>  'product',
            'sort'      => ['order'=>'DESC']
            ]
        assign='productData'
    }
    {if $productData != null}
        <section id="listing-product" class="product-list" itemprop="mainEntity" itemscope itemtype="http://schema.org/ItemList">
            <div class="row">
                <div class="center-gallery">
                    {include file="catalog/loop/product.tpl" data=$productData effect="ming" classCol="col-xs-12 col-sm-6 col-md-4 col-xl-3"}
                </div>
            </div>
        </section>
    {/if}
{/block}