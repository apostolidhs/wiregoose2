import React from 'react';
import {FormattedMessage} from 'react-intl';
import useIntl from 'providers/localization/useIntl';
import {
  Local,
  Globe,
  Manual,
  Currency,
  PersonalComputer,
  Navigate,
  Organization,
  Technology,
  Announce,
  Yoga,
  Car,
  Aid,
  Multimedia,
  Diamond,
  Channel
} from 'grommet-icons';

const icons = {
  country: Local,
  world: Globe,
  politics: Manual,
  economy: Currency,
  lifestyle: Diamond,
  viral: Announce,
  society: Organization,
  science: PersonalComputer,
  travel: Navigate,
  sports: Yoga,
  auto: Car,
  health: Aid,
  culture: Multimedia,
  technology: Technology,
  media: Channel
};

export const CategoryIcon = ({name, ...rest}) => {
  const Icon = icons[name];
  return <Icon {...rest} />;
};

export const CategoryName = ({name}) => <FormattedMessage id={`category.${name}`} />;

export const useCategoryName = () => {
  const t = useIntl();
  return name => t(`category.${name}`);
};
