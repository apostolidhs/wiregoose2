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
  Cafeteria,
  Yoga,
  Car,
  Aid,
  Multimedia,
  Bar
} from 'grommet-icons';

const icons = {
  country: Local,
  world: Globe,
  politics: Manual,
  economy: Currency,
  science: PersonalComputer,
  travel: Navigate,
  sports: Yoga,
  food: Cafeteria,
  auto: Car,
  entertainment: Bar,
  health: Aid,
  culture: Multimedia
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
