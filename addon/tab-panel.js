//(c) 2014 Indexia, Inc.
import Em from 'ember';
import WithConfigMixin from 'ember-idx-utils/mixin/with-config';
import StyleBindingsMixin from 'ember-idx-tabs/mixin/style-bindings';

var computed = Em.computed;

export default Em.Component.extend(WithConfigMixin, StyleBindingsMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: Em.computed(function() {
    var _ref;
    return (_ref = this.get('config.tabs.tabPanelClasses')) != null ? _ref.join(" ") : void 0;
  }),
  // styleBindings: ['height'],
  attributeBindings: ['selected'],

  /**
   * The ancestor `Tabs` component
   * @property tabs
   * @type Tabs
   */
  tabs: computed.alias('parentView'),

  /**
   * A reference to the {{#crossLink "TabList}}TabList{{/crossLink}} instance.
   *
   * @property tabList
   * @type TabList
   */
  tabList: computed.alias('parentView.tabList'),

  /**
   * A reference to the {{#crossLink "Tabs}}{{/crossLink}}'s panels property.
   *
   * @property panels
   * @type Array
   */
  panels: computed.alias('parentView.panels'),

  /**
   * The tab that refer to this tab pane
   *
   * @property tab
   * @type Tab
   */
  tab: Em.computed('panels.length', 'tabList.tab_instances.[]', function() {
    var panels = this.get('panels');
    if (panels) {
        var index = this.get('panels').indexOf(this);
        var tabs = this.get('tabList.tab_instances');
        return tabs && tabs.objectAt(index);
    }
    return false;
  }),
  selected: Em.computed('tab', 'tab.selected', function() {
    return this.get('tab.selected');
  }),
  changeVisibility: Em.observer('selected', function() {
    return this.$().css('display', this.get('selected') ? "" : 'none');
  }),
  register: Em.on('init', function() {
    Em.run.schedule('afterRender', () => {
      return this.get('tabs').addTabPanel(this);
    });
  }),
  unregister: Em.on('willDestroyElement', function() {
    var tabs = this.get('tabs');
    return (tabs) ? tabs.removeTabPanel(this) : null;
  })
});
