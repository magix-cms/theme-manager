{extends file="layout.tpl"}
{block name="title"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'1','default'=>#seo_t_static_news#]}{/block}
{block name="description"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'2','default'=>#seo_t_static_news#]}{/block}
{block name='body:id'}news{/block}
{block name="webType"}CollectionPage{/block}

{block name='article'}
    <article class="col-xs-12 col-sm-8 col-md-9" itemprop="mainEntity" itemscope itemtype="http://schema.org/Periodical">
    {block name='article:content'}
        <h1 itemprop="name">{#news_root_h1#|ucfirst}</h1>
        {widget_news_data
            conf= ['limit' => 6]
            assign="newsData"
            assignPagination="paginationData"
        }
        <div class="news-list row" itemprop="mainEntity" itemscope itemtype="http://schema.org/ItemList">
            {include file="news/loop/news.tpl" data=$newsData}
        </div>
        {if $paginationData}
            <ul class="pagination">
                {include file="section/loop/pagination.tpl" data=$paginationData}
            </ul>
        {/if}
    {/block}
    </article>
{/block}

{block name="foot" append}
    {capture name="scriptVendor"}{strip}
        /min/?f=
        skin/{template}/js/vendor/jquery.fancybox.min.js,
        skin/{template}/js/fancybox.init.min.js
    {/strip}{/capture}
    {script src=$smarty.capture.scriptVendor concat=$concat type="javascript"}
{/block}
{block name="styleSheet" append}
    {capture name="styleSheet"}{strip}
        /min/?f=skin/{template}/css/fancybox/jquery.fancybox.min.css
    {/strip}{/capture}
    {headlink rel="stylesheet" href=$smarty.capture.styleSheet concat=$concat media="screen"}
{/block}