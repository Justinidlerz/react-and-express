import deprecationWarning from './utils/deprecationWarning';

import Accordion from './Accordion';
import Affix from './Affix';
import AffixMixin from './AffixMixin';
import Alert from './Alert';
import Badge from './Badge';
import BootstrapMixin from './BootstrapMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import ButtonInput from './ButtonInput';
import ButtonToolbar from './ButtonToolbar';
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';
import Col from './Col';
import CollapsibleMixin from './CollapsibleMixin';
import CollapsibleNav from './CollapsibleNav';

import Dropdown from './Dropdown';
import DropdownButton from './DropdownButton';
import NavDropdown from './NavDropdown';
import SplitButton from './SplitButton';

import FadeMixin from './FadeMixin';
import Glyphicon from './Glyphicon';
import Grid from './Grid';
import Input from './Input';
import Interpolate from './Interpolate';
import Jumbotron from './Jumbotron';
import Label from './Label';
import ListGroup from './ListGroup';
import ListGroupItem from './ListGroupItem';
import MenuItem from './MenuItem';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

import Nav from './Nav';
import Navbar from './Navbar';
import NavItem from './NavItem';

import Overlay from './Overlay';
import OverlayTrigger from './OverlayTrigger';

import PageHeader from './PageHeader';
import PageItem from './PageItem';
import Pager from './Pager';
import Pagination from './Pagination';
import Panel from './Panel';
import PanelGroup from './PanelGroup';
import Popover from './Popover';
import ProgressBar from './ProgressBar';
import Row from './Row';
import SafeAnchor from './SafeAnchor';
import styleMaps from './styleMaps';
import SubNav from './SubNav';
import Tab from './Tab';
import TabbedArea from './TabbedArea';
import Table from './Table';
import TabPane from './TabPane';
import Tabs from './Tabs';
import Thumbnail from './Thumbnail';
import Tooltip from './Tooltip';
import Well from './Well';

import Portal from './Portal';
import Position from './Position';

import Collapse from './Collapse';
import Fade from './Fade';

import * as FormControls from './FormControls';

import domUtils from './utils/domUtils';
import childrenValueInputValidation from './utils/childrenValueInputValidation';
import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';
import CustomPropTypes from './utils/CustomPropTypes';

import reactRouteBootstrap from './router/index';

const bootstrap = {
  deprecationWarning,

  Accordion,
  Affix,
  AffixMixin,
  Alert,
  Badge,
  BootstrapMixin,
  Button,
  ButtonGroup,
  ButtonInput,
  ButtonToolbar,
  Carousel,
  CarouselItem,
  Col,
  CollapsibleMixin,
  CollapsibleNav,

  Dropdown,
  DropdownButton,
  NavDropdown,

  FadeMixin,
  Glyphicon,
  Grid,
  Input,
  Interpolate,
  Jumbotron,
  Label,
  ListGroup,
  ListGroupItem,
  MenuItem,

  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,

  Nav,
  Navbar,
  NavItem,

  Overlay,
  OverlayTrigger,

  PageHeader,
  PageItem,
  Pager,
  Pagination,
  Panel,
  PanelGroup,
  Popover,
  ProgressBar,
  Row,
  SafeAnchor,
  SplitButton,
  styleMaps,
  SubNav,
  Tab,
  TabbedArea,
  Table,
  TabPane,
  Tabs,
  Thumbnail,
  Tooltip,
  Well,

  Portal,
  Position,

  Collapse,
  Fade,

  FormControls,

  domUtils,
  childrenValueInputValidation,
  createChainedFunction,
  ValidComponentChildren,
  CustomPropTypes,

  ...reactRouteBootstrap
};

export default bootstrap;