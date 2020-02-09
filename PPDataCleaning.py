# Data Cleaning and Aggregation for MA Planned Parenthood Datasets

import pandas as pd

########################################################################################################################

gtm_df = pd.read_excel("~/Desktop/code/HackBeanpotCatAnika/Datasets/GuttmacherDataCenter.xlsx")

gtm_df = gtm_df[['U.S. County',
                 'Population of women aged 13-44, 2016',
                 'No. of women who likely need public support for contraceptive services and supplies, aged 13-44, 2016',
                 'No. of women who likely need public support for contraceptive services and supplies, aged 20-44 ' +
                 'and below the federal poverty level, 2016',
                 'No. of women who likely need public support for contraceptive services and supplies, younger than 20, 2016']]

gtm_df = gtm_df[:-3]

gtm_df = gtm_df.set_index('U.S. County')


gtm_df['Population of women aged 13-44, 2016'] = gtm_df['Population of women aged 13-44, ' +
                                                        '2016'].str.replace(',', '').astype(int)

gtm_df['No. of women who likely need public support ' +
       'for contraceptive services and supplies, ' +
       'aged 13-44, 2016'] = gtm_df['No. of women who likely need public support for contraceptive services ' +
                                    'and supplies, aged 13-44, 2016'].str.replace(',', '').astype(int)

gtm_df['No. of women who likely need public support for ' +
        'contraceptive services and supplies, aged 20-44 ' +
        'and below the federal poverty level, 2016'] = gtm_df['No. of women who likely need public support for ' +
                                                            'contraceptive services and supplies, ' 
                                                            'aged 20-44 ' + 'and below the federal poverty level, ' +
                                                                            '2016'].str.replace(',', '').astype(int)
gtm_df['No. of women who likely need public ' +
       'support for contraceptive services and supplies, ' +
       'younger than 20, 2016'] = gtm_df['No. of women who likely need public support for contraceptive services and ' +
                                         'supplies, younger than 20, 2016'].str.replace(',', '').astype(int)

########################################################################################################################

mass_census_df = pd.read_excel("~/Desktop/code/HackBeanpotCatAnika/Datasets/county-population-mass-census-and-estimates.xlsx")

mass_census_df = mass_census_df.rename(columns=mass_census_df.iloc[0]).drop(mass_census_df.index[0])

mass_census_df = mass_census_df[mass_census_df['YEAR'] == 11]

mass_census_df = mass_census_df[mass_census_df['AGEGRP'] == 0]

mass_census_df = mass_census_df[['CTYNAME', 'YEAR', 'AGEGRP', 'TOT_POP']]

mass_census_df = mass_census_df.set_index('CTYNAME')


########################################################################################################################

# List with all counties that already contain a Planned Parenthood in MA
exist_pp_ma = ['Hampden County', 'Middlesex County', 'Suffolk County', 'Worcester County']

# Storing important data pulled from dataframes in a dictionary
cty_names = ['Barnstable County', 'Berkshire County', 'Bristol County', 'Dukes County', 'Essex County',
                         'Franklin County', 'Hampden County', 'Hampshire County', 'Middlesex County',
                         'Nantucket County', 'Norfolk County', 'Plymouth County', 'Suffolk County', 'Worcester County']

########################################################################################################################

# determines if a given county has a Planned Parenthood
def has_pp(county):

    if county in exist_pp_ma:
        return 1
    else:
        return 0

########################################################################################################################

def county_val_set():

    complete_df = pd.DataFrame()

    complete_df['County Name'] = cty_names
    complete_df = complete_df.set_index('County Name')

    pp_avail_list = []
    tot_pop = []
    w_pop_13_44 = []
    w_pub_sup_13_44 = []
    w_pov_20_44 = []
    w_pub_under_20 = []

    for n in cty_names:
        # if county has a planned parenthood already
        pp_avail = has_pp(n)
        pp_avail_list.append(pp_avail)

        # total population
        population = mass_census_df.loc[n]['TOT_POP']
        tot_pop.append(population)

        # population of women 13-44
        w_13_44 = gtm_df.loc[n]['Population of women aged 13-44, 2016']
        w_pop_13_44.append(w_13_44)

        # women 13-44 needing public support
        pub_sup_13_44 = gtm_df.loc[n]['No. of women who likely need public support for contraceptive services ' +
                                        'and supplies, aged 13-44, 2016']
        w_pub_sup_13_44.append(pub_sup_13_44)

        # women 20-44 needing public support under federal poverty level
        pov_20_44 = gtm_df.loc[n]['No. of women who likely need public support for contraceptive services ' +
                                    'and supplies, aged 20-44 and below the federal poverty level, 2016']
        w_pov_20_44.append(pov_20_44)

        # women under 20 needing public support
        pub_sup_under_20 = gtm_df.loc[n]['No. of women who likely need public support for contraceptive ' +
                                           'services and supplies, younger than 20, 2016']
        w_pub_under_20.append(pub_sup_under_20)

    complete_df['New County'] = pp_avail_list
    complete_df['Population'] = tot_pop
    complete_df['Population of Women Aged 13-44'] = w_pop_13_44
    complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'aged 13-44'] = w_pub_sup_13_44
    complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'aged 20-44 and below the federal poverty level'] = w_pov_20_44
    complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'younger than 20'] = w_pub_under_20
    complete_df['Prop 13 to 44'] = complete_df['Population of Women Aged 13-44'] / complete_df['Population']
    complete_df['Prop Support 13 to 44'] = complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'aged 13-44'] / complete_df['Population of Women Aged 13-44']
    complete_df['Prop Poverty of Support 13 to 44'] = complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'aged 20-44 and below the federal poverty level'] / complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'aged 13-44']
    complete_df['Prop 30 of Support 13 to 44'] = complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'younger than 20'] / complete_df['Number of women who likely need public support for contraceptive services and supplies, ' +
                'aged 13-44']

    return complete_df


df = county_val_set()
df.to_csv("~/Desktop/code/HackBeanpotCatAnika/Datasets/finalCSV.csv")

########################################################################################################################




