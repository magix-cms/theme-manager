<?php
/*
 # -- BEGIN LICENSE BLOCK ----------------------------------
 #
 # This file is part of MAGIX CMS.
 # MAGIX CMS, The content management system optimized for users
 # Copyright (C) 2008 - 2015 magix-cms.com <support@magix-cms.com>
 #
 # OFFICIAL TEAM :
 #
 #   * Gerits Aurelien (Author - Developer) <aurelien@magix-cms.com> <contact@aurelien-gerits.be>
 #
 # Redistributions of files must retain the above copyright notice.
 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # This program is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.

 # You should have received a copy of the GNU General Public License
 # along with this program.  If not, see <http://www.gnu.org/licenses/>.
 #
 # -- END LICENSE BLOCK -----------------------------------

 # DISCLAIMER

 # Do not edit or add to this file if you wish to upgrade MAGIX CMS to newer
 # versions in the future. If you wish to customize MAGIX CMS for your
 # needs please refer to http://www.magix-cms.com for more information.
 */
/**
 * Smarty {widget_country_data} function plugin
 *
 * Type:     function
 * Name:     widget_country_data
 * Date:
 * Update:
 * Output:
 * @author   Gerits Aurélien (http://www.magix-cms.com)
 * @link
 * @version  1.0
 * @param $params
 * @param $template
 * @return string
 */
function smarty_function_widget_country_data($params, $template)
{
    $countryData = new frontend_controller_country();
    $modelSystem = new magixglobal_model_system();
    frontend_model_template::addConfigFile(
        array(
            $modelSystem->base_path().'locali18n/country'
        ),
        array(
            'country_',
        )
        ,false
    );
    $assign = isset($params['assign']) ? $params['assign'] : 'countryData';
    $template->assign($assign,$countryData->setItemsData());
}
?>