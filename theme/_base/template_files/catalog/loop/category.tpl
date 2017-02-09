{strip}
{if isset($data.id)}
    {$data = [$data]}
{/if}
{if !$truncate}
    {$truncate = 250}
{/if}
{/strip}
{if !$effect}
    {if !$classCol}
        {$classCol = 'thumbnail col-xs-12 col-sm-6 col-md-4 col-lg-4'}
    {/if}
    {if is_array($data) && !empty($data)}
        {foreach $data as $item}
            <div{if $classCol} class="{$classCol}" {/if}>
                <div class="caption">
                    <a class="img" href="{$item.url}" title="{$item.name|ucfirst}">
                        {if $item.imgSrc.medium}
                            <img class="img-responsive" src="{$item.imgSrc.medium}" alt="{$item.name|ucfirst}"/>
                        {else}
                            <img class="img-responsive" src="{$item.imgSrc.default}" alt="{$item.name|ucfirst}"/>
                        {/if}
                    </a>
                    <h3>
                        <a href="{$item.url}" title="{$item.name|ucfirst}">
                            {$item.name|ucfirst}
                        </a>
                    </h3>
                    <p>
                        {if $item.content}
                            {$item.content|strip_tags|truncate:$truncate:'...'}
                        {/if}
                    </p>
                </div>
            </div>
        {/foreach}
    {/if}
{else}
    {if !$classCol}
        {$classCol = 'col-xs-12 col-sm-6'}
    {/if}
    {if is_array($data) && !empty($data)}
        {if $effect eq "effect-bob"}
            {foreach $data as $item}
                <div{if $classCol} class="{$classCol}{/if}">
                    <figure class="effect-bob thumbnail">
                        <div class="round-div"></div>
                        <div class="center-img">
                            {if $item.imgSrc.medium}
                                <img src="{$item.imgSrc.medium}" alt="{$item.name|ucfirst}"/>
                            {else}
                                <img src="{$item.imgSrc.default}" alt="{$item.name|ucfirst}"/>
                            {/if}
                        </div>
                        <figcaption>
                            <h3>{$item.name|ucfirst}</h3>
                            <div class="desc">
                                {if $item.content}
                                    <p>
                                        {$item.content|strip_tags|truncate:$truncate:'...'}
                                    </p>
                                {/if}
                            </div>
                            <a href="{$item.url}" title="{$item.name|ucfirst}">{$item.name|ucfirst}</a>
                        </figcaption>
                    </figure>
                </div>
            {/foreach}
        {else}
        {foreach $data as $item}
            <div{if $classCol} class="{$classCol}{/if}" itemprop="hasPart" itemscope itemtype="http://schema.org/Series">
                <figure class="effect-{$effect} thumbnail">
                    {if $item.imgSrc.medium}
                        <img class="img-responsive" src="{$item.imgSrc.medium}" alt="{$item.name|ucfirst}" itemprop="image"/>
                    {else}
                        <img class="img-responsive" src="{$item.imgSrc.default}" alt="{$item.name|ucfirst}"/>
                    {/if}
                    <figcaption>
                        <h3 itemprop="name">{$item.name|ucfirst}</h3>
                        <div itemprop="description" class="desc">
                            {if $item.content}
                                <p>
                                    {$item.content|strip_tags|truncate:$truncate:'...'}
                                </p>
                            {/if}
                        </div>
                        <a itemprop="url" href="{$item.url}" title="{$item.name|ucfirst}">{$item.name|ucfirst}</a>
                    </figcaption>
                </figure>
            </div>
        {/foreach}
        {/if}
    {/if}
{/if}