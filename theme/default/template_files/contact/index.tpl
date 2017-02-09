{extends file="layout.tpl"}
{block name="title"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'1','default'=>#seo_t_static_plugin_contact#]}{/block}
{block name="description"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'2','default'=>#seo_d_static_plugin_contact#]}{/block}
{block name='body:id'}contact{/block}
{block name="webType"}ContactPage{/block}

{block name="slider"}{/block}

{block name='article'}
    <article class="col-xs-12">
        {block name='article:content'}
            <h1 itemprop="name">{#contact_root_h1#}</h1>
            <div class="row">
                <section id="form" class="col-xs-12 col-sm-8 col-md-8 col-lg-8" itemprop="mainContentOfPage" itemscope itemtype="http://schema.org/WebPageElement">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-11 separator">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-11">
                                    <h2>{#pn_contact_forms#|ucfirst}</h2>
                                    <p>{#pn_questions#|ucfirst}</p>
                                    <p>{#pn_fill_form#|ucfirst}</p>
                                    <p class="help-block">{#contact_fiels_resquest#|ucfirst}</p>

                                    <form id="contact-form" method="post" action="{$smarty.server.REQUEST_URI}">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <label for="lastname">{#pn_contact_lastname#|ucfirst}*&nbsp;:</label>
                                                <input id="lastname" type="text" name="lastname" placeholder="{#ph_contact_lastname#|ucfirst}" class="form-control"  />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="firstname">{#pn_contact_firstname#|ucfirst}*&nbsp;:</label>
                                                <input id="firstname" type="text" name="firstname" placeholder="{#ph_contact_firstname#|ucfirst}" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="email">{#pn_contact_mail#|ucfirst}*&nbsp;:</label>
                                            <input id="email" type="text" name="email" placeholder="{#ph_contact_mail#|ucfirst}" class="form-control" />
                                        </div>

                                        <div class="form-group">
                                            <label for="tel">{#pn_contact_phone#|ucfirst}&nbsp;:</label>
                                            <input id="phone" type="text" name="phone" placeholder="{#ph_contact_phone#|ucfirst}" class="form-control"  />
                                        </div>
                                        {if $address_enabled}
                                            <div class="row">
                                                <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                    <label for="address">{#pn_contact_address#|ucfirst}{if $address_required}*{/if}&nbsp;:</label>
                                                    <input id="address" type="text" name="address" placeholder="{#ph_address#|ucfirst}" value="" class="form-control" />
                                                </div>
                                                <div class="form-group col-xs-6 col-sm-6 col-md-3 col-lg-3">
                                                    <label for="postcode">{#pn_contact_postcode#|ucfirst}{if $address_required}*{/if}&nbsp;:</label>
                                                    <input id="postcode" type="text" name="postcode" placeholder="{#ph_postcode#|ucfirst}" value="" class="form-control" />
                                                </div>
                                                <div class="form-group col-xs-6 col-sm-6 col-md-3 col-lg-3">
                                                    <label for="city">{#pn_contact_city#|ucfirst}{if $address_required}*{/if}&nbsp;:</label>
                                                    <input id="city" type="text" name="city" placeholder="{#ph_city#|ucfirst}" value="" class="form-control" />
                                                </div>
                                            </div>
                                        {/if}
                                        <div class="form-group">
                                            <label for="title">{#pn_contact_programme#|ucfirst}*&nbsp;:</label>
                                            <input id="title" type="text" name="title" placeholder="{if $smarty.post.moreinfo}{$smarty.post.moreinfo}{else}{#ph_contact_programme#|ucfirst}{/if}"  value="{$smarty.post.moreinfo}" class="form-control"  />
                                        </div>

                                        <div class="form-group">
                                            <label for="content">{#pn_contact_message#|ucfirst}*&nbsp;:</label>
                                            <textarea id="content" name="content" rows="5" class="form-control"></textarea>
                                        </div>

                                        <div class="mc-message"></div>
                                        <input type="hidden" name="moreinfo" value="" />
                                        <button type="submit" id="btn-contact" class="btn btn-box btn-flat btn-main-theme pull-right">{#pn_contact_send#|ucfirst}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="sidebar" class="col-xs-12 col-sm-4 col-md-4 col-lg-4 pull-right">
                    {include file="contact/block/map.tpl"}
                </section>
            </div>
        {/block}
    </article>
{/block}

{block name="foot" append}
    {script src="/min/?g=form" concat=$concat type="javascript"}
    {capture name="formjs"}{strip}
        /min/?f=skin/{template}/js/form.min.js
    {/strip}{/capture}
    {script src=$smarty.capture.formjs concat=$concat type="javascript" load='async'}
    {if {getlang} eq "en"}
        {script src="/min/?f=plugins/contact/js/public.js" concat=$concat type="javascript"}
    {else}
        {script src="/min/?f=libjs/vendor/localization/messages_{getlang}.js,plugins/contact/js/public.js" concat=$concat type="javascript"}
    {/if}
    <script type="text/javascript">
        $.nicenotify.notifier = {
            box:"",
            elemclass : '.mc-message'
        };
        var iso = '{getlang}';
        var address = {if $address_required}1{else}0{/if};
        $(function(){
            if (typeof MC_plugins_contact == "undefined")
            {
                console.log("MC_plugins_contact is not defined");
            }else{
                MC_plugins_contact.run(iso,address);
            }
        });
    </script>
{/block}