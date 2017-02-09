{autoload_i18n}{widget_about_data}<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>{if isset($smarty.config.subject_contact)}{$smarty.config.subject_contact|replace:'%1$s':$smarty.config.contact_request|replace:'%2$s':$companyData.name}{/if}</title>
        <style>
        .header {
        background: {$getDataCSSIColor[0].color_cssi};
        }

        .header .columns {
            padding-bottom: 0;
        }

        .header p {
        color: {$getDataCSSIColor[1].color_cssi};
        margin-bottom: 0;
        }

        .header .wrapper-inner {
            padding: 0;
            /*controls the height of the header*/
        }

        .header .container {
        background: {$getDataCSSIColor[0].color_cssi};
        }

        .header .container td {
            padding: 15px;
        }

        .spacer.spacer-hr td{
            border-top: 1px solid #eeeeee;
        }
        </style>
</head>
<body>
<!-- <style> -->
<table class="body" data-made-with-foundation>
    <tr>
        <td class="float-center" align="center" valign="top">
            <center data-parsed>
                <table align="center" class="container header float-center">
                    <tr>
                        <td class="wrapper-inner">
                            <table align="center" class="container">
                                <tbody>
                                <tr>
                                    <td valign="middle">
                                        <!-- Gmail/Hotmail image display fix -->
                                        <a href="{geturl}" target ="_blank" title="{$companyData.name}" style="text-decoration: none;font-size: 46px;">
                                            <img src="{geturl}/skin/{template}/img/logo/{#logo_img_mail#}" alt="{#logo_img_alt#|ucfirst}" width="270" height="88"/>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
                {block name='body:content'}{/block}
            </center>
        </td>
    </tr>
</table>
</body>
</html>