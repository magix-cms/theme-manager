{strip}
    {* default,dropdown,tabs,tabs-arrow *}
    {if !isset($menu)}
        {assign var='menu' value='dropdown'}
    {/if}
    {* clip,fluid *}
    {if !isset($adjust)}
        {assign var="adjust" value="clip"}
    {/if}
    {* Default menu roots *}
    {if !isset($root)}
        {assign var="root" value=['home'=>true,'about'=>false,'catalog'=>true,'news'=>true,'contact'=>true]}
    {/if}
    {if !isset($gmap)}
        {assign var="gmap" value=false}
    {/if}
    {if !isset($faq)}
        {assign var="faq" value=false}
    {/if}
    {if !isset($submenu)}
        {assign var="submenu" value=true}
    {/if}
    {if !isset($menubar)}
        {assign var="menubar" value=true}
    {/if}
    {if !isset($menuclass)}
        {assign var="menuclass" value=''}
    {/if}
    {if !isset($affix)}
        {assign var="affix" value=true}
    {/if}
{/strip}
<header id="header">
    {if $toolbar}
        {include file="section/toolbar.tpl" adjust="clip"}
    {/if}
    <section id="header-menu" role="navigation" class="{if $adjust == 'fluid'}section-block container-fluid{/if}">
        {if $adjust == 'clip'}<div class="container">
            <div class="row">{/if}
                {* Show Nav Button (xs ad sm only) *}
                <button id="toggle-menu" type="button" class="navbar-toggle pull-right" data-toggle="collapse" data-target="#main-menu">
                    <span class="sr-only">{#toggleNavigation#|ucfirst}</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                {* Brand && Headline *}
                <div>
                    <a class="navbar-brand" href="{geturl}/{getlang}/" title="{#logo_link_title#|ucfirst}">
                        <img src="{geturl}/skin/{template}/img/logo/{#logo_img#}" alt="{#logo_img_alt#|ucfirst} {$companyData.name}" width="269" height="50" />
                    </a>
                </div>
                {if ($adjust == 'clip' && !$menubar) || $adjust == 'fluid'}
                    {include file="section/menu/primary.tpl" id="main-menu" type=$menu cclass=$menuclass root=$root submenu=$submenu gmap=$gmap faq=$faq justified=$menubar microData=true}
                {/if}
                {if $adjust == 'clip'}
            </div>
        </div>
        {/if}
        {if $adjust == 'clip' && $menubar}
            {include file="section/menu/primary.tpl" id="main-menu" type=$menu cclass=$menuclass root=$root submenu=$submenu gmap=$gmap faq=$faq justified=$menubar microData=true}
        {/if}
    </section>
    {if $affix}
    <section id="header-fixed" role="navigation" {if $adjust == 'fluid' || $menubar} class="{if $menubar}affix-menubar{/if}{if $adjust == 'fluid'} section-block container-fluid{/if}"{/if} aria-hidden="true">
        {if $adjust == 'clip'}
        <div class="container">
            <div class="row">
                {/if}
            {if !$menubar}
            {* Brand && Headline *}
            <a class="navbar-brand" href="/{getlang}/" title="{#logo_link_title#|ucfirst}">
                <img class="img-responsive" src="/skin/{template}/img/logo/{#logo_img_affix#}" alt="{#logo_img_alt#|ucfirst}" width="200" height="37"/>
            </a>
            {/if}
            {if $adjust == 'clip' && !$menubar}
                {include file="section/menu/primary.tpl" id="menu-fixed" type=$menu cclass=$menuclass root=$root submenu=$submenu gmap=$gmap faq=$faq justified=$menubar microData=false}
            {/if}
                {if $adjust == 'clip'}
            </div>
        </div>
        {/if}
        {if ($adjust == 'clip' && $menubar) || $adjust == 'fluid'}
            {include file="section/menu/primary.tpl" id="menu-fixed" type=$menu cclass=$menuclass root=$root submenu=$submenu gmap=$gmap faq=$faq justified=$menubar microData=false}
        {/if}
    </section>
    {/if}
</header>