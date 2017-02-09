{if $fonts && is_array($fonts)}
    {$family = ''}
    {foreach $fonts as $font}
        {$fontfamily = $font@key|replace:' ':'+'}
        {if $font}
            {$style = ':'|cat:$font}
        {else}
            {$style = ''}
        {/if}
        {$family = $family|cat:$fontfamily|cat:$style}
        {if !$font@last}
            {$family = $family|cat:'|'}
        {/if}
    {/foreach}
    <link href="{if isset($smarty.server.HTTPS) eq 'on'}https{else}http{/if}://fonts.googleapis.com/css?family={$family}" rel="stylesheet" type="text/css">
{/if}