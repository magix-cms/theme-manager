{autoload_i18n}{widget_admin_session}{widget_about_data}<!DOCTYPE html>
<!--[if lt IE 7]><html lang="{getlang}" class="lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html lang="{getlang}" class="lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html lang="{getlang}" class="lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html lang="{getlang}"><!--<![endif]-->
<head id="meta" {block name="ogp"}{include file="section/brick/ogp-protocol.tpl"}{/block}>{* Document meta *}
    <meta charset="utf-8">
    <title itemprop="headline">{capture name="title"}{block name="title"}{/block}{/capture}{$smarty.capture.title}</title>
    <meta itemprop="description" name="description" content="{capture name="description"}{block name="description"}{/block}{/capture}{$smarty.capture.description}">
    <meta name="robots" content="{google_tools tools='robots'}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {block name="socials"}{include file="section/brick/socials.tpl" title=$smarty.capture.title description=$smarty.capture.description}{/block}
{if $googleTools_webmaster != ''}
    <meta name="google-site-verification" content="{$googleTools_webmaster}">
{/if}
    <link rel="icon" type="image/png" href="{geturl}/skin/{template}/img/favicon.png" />
    <!--[if IE]><link rel="shortcut icon" type="image/x-icon" href="{geturl}/skin/{template}/img/favicon.ico" /><![endif]-->
    {capture name="stylesheet"}{strip}
        {if isset($mobileBrowser) && $mobileBrowser}
            /min/?f=skin/{template}/css/mobile.min.css
        {else}
            /min/?f=skin/{template}/css/style.min.css
        {/if}
    {/strip}{/capture}
{strip}{headlink rel="stylesheet" href=$smarty.capture.stylesheet concat=$concat media="screen"}
{/strip}{if {module type="news"} eq true}
    <link rel="alternate" type="application/rss+xml" href="{geturl}/news_{getlang}_rss.xml" title="RSS">
{/if}
{capture name="scriptHtml5"}{strip}
    /min/?f=
    skin/{template}/js/vendor/html5shiv.min.js,
    skin/{template}/js/vendor/respond.min.js
{/strip}{/capture}
    {strip}<!--[if lt IE 9]>{script src=$smarty.capture.scriptHtml5 concat=$concat type="javascript"}<![endif]-->{/strip}
    {strip}{* Language link hreflang *}{widget_lang_data assign="dataLangHead"}{include file="section/loop/lang.tpl" data=$dataLangHead type="head"}{google_tools tools='analytics'}
{/strip}</head>
<body id="{block name='body:id'}layout{/block}" itemscope itemtype="http://schema.org/{block name="webType"}WebPage{/block}" itemref="meta">
    {include file="section/brick/cookie-consent.tpl"}{* Pour menu="cat-dropdown" ou menu="mega-dropdown" il faut au minimum menuclass='mega-dropdown' *}
    {include file="section/header.tpl" adjust="clip" toolbar=true menubar=false menu="dropdown" menuclass='' submenu=true gmap=false faq=false affix=false}
    {block name="breadcrumb"}
        {include file="section/nav/breadcrumb.tpl" adjust="clip" quickAccess=false icon=false}
    {/block}
    {block name="main:before"}{/block}
    {block name="main"}
    <main id="content" class="container">
        <div class="row">
            {block name="article:before"}{/block}

            {block name='article'}
                <article class="col-xs-12 col-sm-8 col-md-9">
                    {block name='article:content'}{/block}
                </article>
            {/block}

            {block name="aside"}
                <aside id="aside" class="col-xs-12 col-sm-4 col-md-3">
                    {block name='aside:content'}
                        {include file="section/sidebar.tpl"}
                    {/block}
                </aside>
            {/block}

            {block name="article:after"}{/block}
            </div>
    </main>
    {/block}

    {block name="main:after"}{/block}
    {* blocks=['facebook','news','cms','contact'] *}
    {include file="section/footer.tpl" adjust="clip" blocks=['news','cms','contact']}

    {include file="section/nav/btt.tpl" affix=300}

    {block name="foot"}
        {strip}
            {capture name="jQuery"}{strip}
                /min/?f=skin/{template}/js/vendor/jquery.min.js
            {/strip}{/capture}
            {script src=$smarty.capture.jQuery concat=$concat type="javascript"}
            {capture name="bootstrap"}{strip}
                {if isset($mobileBrowser) && $mobileBrowser}
                    /min/?f=skin/{template}/js/vendor/bootstrap-mobile.min.js
                {else}
                    /min/?f=skin/{template}/js/vendor/bootstrap.min.js
                {/if}
            {/strip}{/capture}
            {script src=$smarty.capture.bootstrap concat=$concat type="javascript"}
            {capture name="scriptSkin"}{strip}
                /min/?f=skin/{template}/js/global.min.js
            {/strip}{/capture}
            {script src=$smarty.capture.scriptSkin concat=$concat type="javascript" load='async'}
        {/strip}
    {/block}
    {block name="fonts"}{include file="section/brick/google-font.tpl" fonts=['Open Sans'=>'300,400,600,400italic','Raleway'=>'300,500','Philosopher'=>'0']}{/block}
    {block name="styleSheet"}{/block}
</body>
</html>