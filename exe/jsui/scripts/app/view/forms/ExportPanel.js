// ===========================================================================
// eXe
// Copyright 2012, Pedro Peña Pérez, Open Phoenix IT
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
//===========================================================================

Ext.define('eXe.view.forms.ExportPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.export',

    requires: ['eXe.view.forms.HelpContainer'],
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            autoScroll: true,
            trackResetOnLoad: true,            
            items: [
                {
                    xtype: 'fieldset',
                    title: _('Global Options'),
                    margin: 10,
                    items: [
                        {
                            xtype: 'helpcontainer',
                            item: {
	                            xtype: 'combobox',
	                            inputId: 'pp_exportMetadataType',
	                            labelWidth: 150,
	                            fieldLabel: _('Metadata Type'),
	                            store: [
	                                  ["DC", _("Dublin Core")],
	                                  ["LOM", _("LOM v1.0")],
	                                  ["LOMES", _("LOM-ES v1.0")]
	                            ],
                                dirtyCls: 'property-form-dirty',
	                            tooltip: _('Metadata Type'),
	                            anchor: '100%'
                            },
                            flex: 0,
                            help: _('Metadata Type')
                        },{
                            xtype: 'helpcontainer',
                            item: {
                                xtype: 'checkboxfield',
                                inputId: 'pp_exportSource',
                                boxLabel: _('Create editable export?'),
                                inputValue: true,
                                uncheckedValue: false,
                                dirtyCls: 'property-form-dirty',
                                tooltip: _('Checking this option, the exported component will be editable with eXeLearning.')
                            },
                            flex: 0,
                            help: _('Checking this option, the exported component will be editable with eXeLearning.')
                        },{
                            xtype: 'helpcontainer',
                            item: {
                                xtype: 'checkboxfield',
                                inputId: 'pp_addSearchBox',
                                boxLabel: _('Add a search bar (editable Web Site export only)'),
                                inputValue: true,
                                uncheckedValue: false,
                                dirtyCls: 'property-form-dirty',
                                tooltip: _('Checking this option, a search box will be added to every page. The "%" option has to be checked too.').replace("%",_('Create editable export?'))
                            },
                            flex: 0,
                            help: _('Checking this option, a search box will be added to every page. The "%" option has to be checked too.').replace("%",_('Create editable export?'))
                        },{
                            xtype: 'helpcontainer',
                            item: {
                                xtype: 'checkboxfield',
                                inputId: 'pp_addPagination',
                                boxLabel: _('Add page counters in the footer and header of the export?'),
                                inputValue: true,
                                uncheckedValue: false,
                                dirtyCls: 'property-form-dirty',
                                tooltip: _('Checking this option, a "Page X of Y." text will be added to every page of the exported content (except ePub\'s frontpage). This doesn\'t affect Single Page and Text File export files.')
                            },
                            flex: 0,
                            help: _('Checking this option, a "Page X of Y." text will be added to every page of the exported content (except ePub\'s frontpage). This doesn\'t affect Single Page and Text File export files.')
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
		    title: _('SCORM Options (1.2 and 2004)'),
                    margin: 10,
                    items: [
                        {
                            xtype: 'helpcontainer',
                            item: {
                                xtype: 'checkboxfield',
                                inputId: 'pp_scolinks',
                                boxLabel: _('Add Previous/Next links within SCOs?'),
                                inputValue: true,
                                uncheckedValue: false,
                                dirtyCls: 'property-form-dirty',
                                tooltip: _('Checking this box will cause eXe to add Previous and Next links to individual pages within your SCO. The LMS will also still add this kind of functionality.')
                            },
                            flex: 0,
                            help: _('Checking this box will cause eXe to add Previous and Next links to individual pages within your SCO.  This requires a non-standard extension to SCORM 1.2 and is only known to work with some versions of Moodle.')
                        },{
                            xtype: 'helpcontainer',
                            item: {
                                xtype: 'checkboxfield',
                                inputId: 'pp_scowsinglepage',
                                boxLabel: _('Include Single Page export file?'),
                                inputValue: true,
                                uncheckedValue: false,
                                dirtyCls: 'property-form-dirty',
                                tooltip: _('Checking this option the exported SCORM file will include a file named "singlepage_index.html" containing the result of exporting this eXe package as a single page.')
                            },
                            flex: 0,
                            help: _('Checking this option the exported SCORM file will include a file named "singlepage_index.html" containing the result of exporting this eXe package as a single page.')
                        },{
                            xtype: 'helpcontainer',
                            item: {
                                xtype: 'checkboxfield',
                                inputId: 'pp_scowwebsite',
                                boxLabel: _('Include Web Site export files?'),
                                inputValue: true,
                                uncheckedValue: false,
                                dirtyCls: 'property-form-dirty',
                                tooltip: _('Checking this option the exported SCORM file will include the result of exporting this eXe package as Web Site. All the html files will have the "website_" prefix to differentiate them from their SCORM equivalent.')
                            },
                            flex: 0,
                            help: _('Checking this option the exported SCORM file will include the result of exporting this eXe package as Web Site. All the html files will have the "website_" prefix to differentiate them from their SCORM equivalent.')
                        }
                    ]
                },
             
                {
                	xtype: 'button',
                	text: _('Save'),
                	itemId: 'save_properties',
                	margin: 10
                },
                {
                    xtype: 'button',
                    text: _('Clear'),
                    itemId: 'clear_properties',
                    margin: 10
                },
                {
                    xtype: 'button',
                    text: _('Reset'),
                    itemId: 'reset_properties',
                    margin: 10
                }
            ]
        });

        me.callParent(arguments);
    }

});
