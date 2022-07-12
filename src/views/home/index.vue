<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              Dashboard
            </h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">Dashboard</li>
            </ol>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="row" v-if="!loading">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ users.length }}</h3>
              <p>Users</p>
            </div>
            <div class="icon">
              <i class="fas fa-users"></i>
            </div>
            <a href="#" class="small-box-footer text-white">
              <router-link to="/users">
                <span class="text-white mx-2">More info</span>
                <i class="fas fa-arrow-circle-right text-white"></i>
              </router-link>
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{{ projects.length }}</h3>
              <p>Projects</p>
            </div>
            <div class="icon">
              <i class="fas fa-edit"></i>
            </div>
            <a href="#" class="small-box-footer text-white">
              <router-link to="/projects">
                <span class="text-white mx-2">More info</span>
                <i class="fas fa-arrow-circle-right text-white"></i>
              </router-link>
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{ todos.length }}</h3>
              <p>Todos</p>
            </div>
            <div class="icon">
              <i class="fa fa-check"></i>
            </div>
            <a href="#" class="small-box-footer text-white">
              <router-link to="/todos">
                <span class="text-white mx-2">More info</span>
                <i class="fas fa-arrow-circle-right text-white"></i>
              </router-link>
            </a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>{{ comments.length }}</h3>
              <p>Comments</p>
            </div>
            <div class="icon">
              <i class="fas fa-sticky-note"></i>
            </div>
            <a href="#" class="small-box-footer text-white">
              <router-link to="/comments">
                <span class="text-white mx-2">More info</span>
                <i class="fas fa-arrow-circle-right text-white"></i>
              </router-link>
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Latest Members</h3>
              <div class="card-tools">
                <span class="badge badge-danger">
                  {{ users.slice(4).length }} New Members
                </span>
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="card-body p-0">
              <ul class="users-list clearfix">
                <li :key="u.id" v-for="u in users.slice(4)">
                  <img
                    :src="
                      'https://randomuser.me/api/portraits/men/' + u.id + '.jpg'
                    "
                    alt="User Image"
                  />
                  <a class="users-list-name" href="#">{{ u.name }}</a>
                  <span class="users-list-date">Today</span>
                </li>
              </ul>
            </div>

            <a href="#" class="card-footer text-cente">
              <router-link to="/users">
                <span class="text-white mx-2">More info</span>
                <i class="fas fa-arrow-circle-right text-white"></i>
              </router-link>
            </a>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header border-0">
              <h3 class="card-title">Projects</h3>
              <div class="card-tools">
                <a href="#" class="btn btn-tool btn-sm">
                  <i class="fas fa-download"></i>
                </a>
                <a href="#" class="btn btn-tool btn-sm">
                  <i class="fas fa-bars"></i>
                </a>
              </div>
            </div>
            <div class="card-body table-responsive p-0">
              <table class="table table-striped table-valign-middle">
                <thead>
                  <tr>
                    <th>Our Projects</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr :key="p.id" v-for="p in projects.slice(95)">
                    <td>
                      <img
                        :src="'https://picsum.photos/id/' + p.id + '/200/300'"
                        :alt="p.id"
                        class="img-size-32 mr-2"
                      />
                      {{ p.id }}
                    </td>
                    <td>{{ p.title }}</td>
                    <td>{{ p.userId }}</td>
                    <td>
                      <router-link :to="'/projects/' + p.id">
                        <a href="#" class="text-muted">
                          <i class="fas fa-search"></i>
                        </a>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Todos - Incompleted/Completed</h3>
              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="card-body">
              <div class="row" v-if="!loading && todos">
                <div class="col-md-8">
                  <div class="chart-responsive">
                    <div class="chartjs-size-monitor">
                      <div class="chartjs-size-monitor-expand">
                        <div class=""></div>
                      </div>
                      <div class="chartjs-size-monitor-shrink">
                        <div class=""></div>
                      </div>
                    </div>
                    <canvas
                      ref="pieChart"
                      id="pieChart"
                      height="82"
                      width="165"
                      style="display: block; width: 165px; height: 82px;"
                      class="chartjs-render-monitor"
                    ></canvas>
                  </div>
                </div>

                <div class="col-md-4">
                  <ul class="chart-legend clearfix">
                    <li>
                      <i class="far fa-circle text-success"></i>
                      Completed
                    </li>
                    <li>
                      <i class="far fa-circle text-danger"></i>
                      Incompleted
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="card-footer p-0">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                  <div class="nav-link">
                    Performance today
                    
                  </div>
                </li>
                <li class="nav-item">
                  <div class="nav-link">
                    Performance yesterday
                   
                  </div>
                </li>
                <li class="nav-item">
                  <div class="nav-link">
                    Performance in ({{
                      new Date(new Date().getDay() - 2).toDateString()
                    }}) 
                  
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-gradient-primary">
            <div
              class="card-header border-0 ui-sortable-handle"
              style="cursor: move;"
            >
              <h3 class="card-title">
                <i class="far fa-calendar-alt"></i>
                Calendar
              </h3>

              <div class="card-tools">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm dropdown-toggle"
                    data-toggle="dropdown"
                    data-offset="-52"
                  >
                    <i class="fas fa-bars"></i>
                  </button>
                  <div class="dropdown-menu" role="menu">
                    <a href="#" class="dropdown-item">Add new event</a>
                    <a href="#" class="dropdown-item">Clear events</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">View calendar</a>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-card-widget="remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="card-body pt-0">
              <div id="calendar" style="width: 100%;">
                <div class="bootstrap-datetimepicker-widget usetwentyfour">
                  <ul class="list-unstyled">
                    <li class="show">
                      <div class="datepicker">
                        <div class="datepicker-days" style="">
                          <table class="table table-sm">
                            <thead>
                              <tr>
                                <th class="prev" data-action="previous">
                                  <span
                                    class="fa fa-chevron-left"
                                    title="Previous Month"
                                  ></span>
                                </th>
                                <th
                                  class="picker-switch"
                                  data-action="pickerSwitch"
                                  colspan="5"
                                  title="Select Month"
                                >
                                  April 2022
                                </th>
                                <th class="next" data-action="next">
                                  <span
                                    class="fa fa-chevron-right"
                                    title="Next Month"
                                  ></span>
                                </th>
                              </tr>
                              <tr>
                                <th class="dow">Su</th>
                                <th class="dow">Mo</th>
                                <th class="dow">Tu</th>
                                <th class="dow">We</th>
                                <th class="dow">Th</th>
                                <th class="dow">Fr</th>
                                <th class="dow">Sa</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  data-action="selectDay"
                                  data-day="03/27/2022"
                                  class="day old weekend"
                                >
                                  27
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="03/28/2022"
                                  class="day old"
                                >
                                  28
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="03/29/2022"
                                  class="day old"
                                >
                                  29
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="03/30/2022"
                                  class="day old"
                                >
                                  30
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="03/31/2022"
                                  class="day old"
                                >
                                  31
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/01/2022"
                                  class="day"
                                >
                                  1
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/02/2022"
                                  class="day weekend"
                                >
                                  2
                                </td>
                              </tr>
                              <tr>
                                <td
                                  data-action="selectDay"
                                  data-day="04/03/2022"
                                  class="day weekend"
                                >
                                  3
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/04/2022"
                                  class="day"
                                >
                                  4
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/05/2022"
                                  class="day"
                                >
                                  5
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/06/2022"
                                  class="day"
                                >
                                  6
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/07/2022"
                                  class="day"
                                >
                                  7
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/08/2022"
                                  class="day"
                                >
                                  8
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/09/2022"
                                  class="day weekend"
                                >
                                  9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  data-action="selectDay"
                                  data-day="04/10/2022"
                                  class="day weekend"
                                >
                                  10
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/11/2022"
                                  class="day"
                                >
                                  11
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/12/2022"
                                  class="day"
                                >
                                  12
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/13/2022"
                                  class="day"
                                >
                                  13
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/14/2022"
                                  class="day"
                                >
                                  14
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/15/2022"
                                  class="day"
                                >
                                  15
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/16/2022"
                                  class="day weekend"
                                >
                                  16
                                </td>
                              </tr>
                              <tr>
                                <td
                                  data-action="selectDay"
                                  data-day="04/17/2022"
                                  class="day weekend"
                                >
                                  17
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/18/2022"
                                  class="day"
                                >
                                  18
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/19/2022"
                                  class="day"
                                >
                                  19
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/20/2022"
                                  class="day"
                                >
                                  20
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/21/2022"
                                  class="day"
                                >
                                  21
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/22/2022"
                                  class="day active today"
                                >
                                  22
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/23/2022"
                                  class="day weekend"
                                >
                                  23
                                </td>
                              </tr>
                              <tr>
                                <td
                                  data-action="selectDay"
                                  data-day="04/24/2022"
                                  class="day weekend"
                                >
                                  24
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/25/2022"
                                  class="day"
                                >
                                  25
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/26/2022"
                                  class="day"
                                >
                                  26
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/27/2022"
                                  class="day"
                                >
                                  27
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/28/2022"
                                  class="day"
                                >
                                  28
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/29/2022"
                                  class="day"
                                >
                                  29
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="04/30/2022"
                                  class="day weekend"
                                >
                                  30
                                </td>
                              </tr>
                              <tr>
                                <td
                                  data-action="selectDay"
                                  data-day="05/01/2022"
                                  class="day new weekend"
                                >
                                  1
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="05/02/2022"
                                  class="day new"
                                >
                                  2
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="05/03/2022"
                                  class="day new"
                                >
                                  3
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="05/04/2022"
                                  class="day new"
                                >
                                  4
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="05/05/2022"
                                  class="day new"
                                >
                                  5
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="05/06/2022"
                                  class="day new"
                                >
                                  6
                                </td>
                                <td
                                  data-action="selectDay"
                                  data-day="05/07/2022"
                                  class="day new weekend"
                                >
                                  7
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="datepicker-months" style="display: none;">
                          <table class="table-condensed">
                            <thead>
                              <tr>
                                <th class="prev" data-action="previous">
                                  <span
                                    class="fa fa-chevron-left"
                                    title="Previous Year"
                                  ></span>
                                </th>
                                <th
                                  class="picker-switch"
                                  data-action="pickerSwitch"
                                  colspan="5"
                                  title="Select Year"
                                >
                                  2022
                                </th>
                                <th class="next" data-action="next">
                                  <span
                                    class="fa fa-chevron-right"
                                    title="Next Year"
                                  ></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colspan="7">
                                  <span data-action="selectMonth" class="month">
                                    Jan
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Feb
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Mar
                                  </span>
                                  <span
                                    data-action="selectMonth"
                                    class="month active"
                                  >
                                    Apr
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    May
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Jun
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Jul
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Aug
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Sep
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Oct
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Nov
                                  </span>
                                  <span data-action="selectMonth" class="month">
                                    Dec
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="datepicker-years" style="display: none;">
                          <table class="table-condensed">
                            <thead>
                              <tr>
                                <th class="prev" data-action="previous">
                                  <span
                                    class="fa fa-chevron-left"
                                    title="Previous Decade"
                                  ></span>
                                </th>
                                <th
                                  class="picker-switch"
                                  data-action="pickerSwitch"
                                  colspan="5"
                                  title="Select Decade"
                                >
                                  2020-2029
                                </th>
                                <th class="next" data-action="next">
                                  <span
                                    class="fa fa-chevron-right"
                                    title="Next Decade"
                                  ></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colspan="7">
                                  <span
                                    data-action="selectYear"
                                    class="year old"
                                  >
                                    2019
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2020
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2021
                                  </span>
                                  <span
                                    data-action="selectYear"
                                    class="year active"
                                  >
                                    2022
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2023
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2024
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2025
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2026
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2027
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2028
                                  </span>
                                  <span data-action="selectYear" class="year">
                                    2029
                                  </span>
                                  <span
                                    data-action="selectYear"
                                    class="year old"
                                  >
                                    2030
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="datepicker-decades" style="display: none;">
                          <table class="table-condensed">
                            <thead>
                              <tr>
                                <th class="prev" data-action="previous">
                                  <span
                                    class="fa fa-chevron-left"
                                    title="Previous Century"
                                  ></span>
                                </th>
                                <th
                                  class="picker-switch"
                                  data-action="pickerSwitch"
                                  colspan="5"
                                >
                                  2000-2090
                                </th>
                                <th class="next" data-action="next">
                                  <span
                                    class="fa fa-chevron-right"
                                    title="Next Century"
                                  ></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colspan="7">
                                  <span
                                    data-action="selectDecade"
                                    class="decade old"
                                    data-selection="2006"
                                  >
                                    1990
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2006"
                                  >
                                    2000
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2016"
                                  >
                                    2010
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade active"
                                    data-selection="2026"
                                  >
                                    2020
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2036"
                                  >
                                    2030
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2046"
                                  >
                                    2040
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2056"
                                  >
                                    2050
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2066"
                                  >
                                    2060
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2076"
                                  >
                                    2070
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2086"
                                  >
                                    2080
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade"
                                    data-selection="2096"
                                  >
                                    2090
                                  </span>
                                  <span
                                    data-action="selectDecade"
                                    class="decade old"
                                    data-selection="2106"
                                  >
                                    2100
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </li>
                    <li class="picker-switch accordion-toggle"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-if="loading">
        <div class="card-body d-flex align-items-center">
          <div
            class="spinner-border spinner-border-sm text-secondary mr-2"
            role="status"
          >
            <span class="sr-only">Please wait...</span>
          </div>
          Loading...
        </div>
      </div>
    </section>
  <!--  
     <button @click="handleTestProjects">Test Projects</button>
    <button @click="handleTestComments">Test Comments</button>
    <button @click="handleTestTodos">Test Todos</button>
    <button @click="handleTestUsers">Test Users</button>
    -->
  </div>
</template>

<script>
import {
  createProject,
  getProjectById,
  getProjects,
  getProjectsByQuery,
  removeProjectById,
  updateProjectById,
} from '../../domain/projects'
import {
  createComment,
  getCommentById,
  getComments,
  getCommentsByQuery,
  removeCommentById,
  updateCommentById,
} from '../../domain/comments'
import {
  createTodo,
  getTodoById,
  getTodos,
  getTodosByQuery,
  removeTodoById,
  updateTodoById,
} from '../../domain/todos'
import {
  createUser,
  getUserById,
  getUsers,
  getUsersByQuery,
  removeUserById,
  updateUserById,
} from '../../domain/users'
export default {
  data() {
    return {
      users: [],
      projects: [],
      todos: [],
      comments: [],
      loading: false,
      error: false,
      pieChart: null,
    }
  },
  mounted() {
    this.fetchUsers()
    this.fetchProjects()
    this.fetchTodos()
    this.fetchComments()
  },
  methods: {
   /* async fetchUsers() {
      this.users = []
      this.error = null
      this.loading = true
      try {
       const snap = await getUsers()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
      } catch (error) {
        console.log(error)
      }
    },*/
    async fetchProjects() {
      this.projects = []
      this.error = null
      this.loading = true
      
      try {
        const { data } = await getProjects()
        this.projects = data
        this.count = data.length
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },/*
    async fetchTodos() {
      this.todos = []
      this.error = null
      this.loading = true
      try {
        const { data } = await getTodos()
        this.todos = data
        this.showPieChart()
        this.count = data.length
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },
    async fetchComments() {
      this.comments = []
      this.error = null
      this.loading = true
      try {
        const { data } = await getUsers()
        this.comments = data
        this.count = data.length
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
        console.log(error)
      }
    },*/
    async showPieChart() {
  
      const pieData = {
        labels: ['Incompleted', 'Completed'],
        datasets: [
          {
            data: [incompleted.length, completed.length],
            backgroundColor: ['#00a65a', '#f56954'],
          },
        ],
      }
      var pieOptions = {
        legend: {
          display: false,
        },
      }
      this.pieChart = new Chart(pieChartCanvas, {
        type: 'doughnut',
        data: pieData,
        options: pieOptions,
      })
    },/*
    handleTestProjects() {
      const fn1 = async () => {
        try {
          const Statuses = {
            IN_PROGRESS: 'IN_PROGRESS',
            UNASSIGNED: 'UNASSIGNED',
            COMPLETED: 'COMPLETED',
          }
          const snap = await createProject({
            title: 'foo',
            desciption: 'bar',
            createdAt: new Date().toISOString(),
            leaderId: '123', // Account ID
            company: 'Bargou',
            status: Statuses.UNASSIGNED, // UNASSIGNED || IN_PROGRESS || COMPLETED
          })
          console.log(snap.id)
        } catch (error) {
          console.log(error)
        }
      }
      const fn2 = async () => {
        try {
          const snap = await getProjects()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn3 = async () => {
        try {
          const Statuses = {
            IN_PROGRESS: 'IN_PROGRESS',
            UNASSIGNED: 'UNASSIGNED',
            COMPLETED: 'COMPLETED',
          }
          const field = `status`
          const operator = '=='
          const value = Statuses.IN_PROGRESS
          const snap = await getProjectsByQuery({ field, operator, value })
          snap.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn4 = async () => {
        try {
          const id = 'ZTWC2oiwbDK2uZa98FD4'
          const snap = await getProjectById(id)
          console.log(snap.data())
        } catch (error) {
          console.log(error)
        }
      }
      const fn5 = async () => {
        try {
          const id = '8X5g5GNIMYwKqcWb2gd9'
          const response = await removeProjectById(id)
          alert('Success')
        } catch (error) {
          console.log(error)
        }
      }
      const fn6 = async () => {
        try {
          const id = 'ZTWC2oiwbDK2uZa98FD4'
          const snap = await updateProjectById(id, {
            title: 'My new test title',
            updatedAt: new Date().toISOString(),
          })
          console.log(snap)
        } catch (error) {
          console.log(error)
        }
      }
      fn1()
      // fn2()
      // fn3()
      // fn4()
      // fn5()
      // fn6()
    },
    handleTestComments() {
      const fn1 = async () => {
        try {
          const Types = {
            OWN: 'OWN',
            BY_MANAGER: 'BY_MANAGER',
          }
          const snap = await createComment({
            accountId: '123',
            message: 'You are good',
            type: 'OWN',
            createdAt: new Date().toISOString(),
            type: Types.OWN, // UNASSIGNED || IN_PROGRESS || COMPLETED
          })
          console.log(snap.id)
        } catch (error) {
          console.log(error)
        }
      }
      const fn2 = async () => {
        try {
          const snap = await getComments()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn3 = async () => {
        try {
          const Types = {
            OWN: 'OWN',
            BY_MANAGER: 'BY_MANAGER',
          }
          const field = `type`
          const operator = '=='
          const value = Types.BY_MANAGER
          const snap = await getCommentsByQuery({ field, operator, value })
          snap.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn4 = async () => {
        try {
          const id = 'melDP2T2XzLJkqHRmX1v'
          const snap = await getCommentById(id)
          console.log(snap.data())
        } catch (error) {
          console.log(error)
        }
      }
      const fn5 = async () => {
        try {
          const id = 'melDP2T2XzLJkqHRmX1v'
          const response = await removeCommentById(id)
          alert('Success')
        } catch (error) {
          console.log(error)
        }
      }
      const fn6 = async () => {
        try {
          const id = 'ouC1UauYiBjilK1ChDvI'
          const snap = await updateCommentById(id, {
            message: 'My new test message',
            updatedAt: new Date().toISOString(),
          })
          console.log(snap)
        } catch (error) {
          console.log(error)
        }
      }
      fn1()
      // fn2()
      // fn3()
      // fn4()
      // fn5()
      // fn6()
    },
    handleTestTodos() {
      const fn1 = async () => {
        try {
          const Statuses = {
            IN_PROGRESS: 'IN_PROGRESS',
            UNASSIGNED: 'UNASSIGNED',
            COMPLETED: 'COMPLETED',
          }
          const snap = await createTodo({
            title: 'foo',
            desciption: 'bar',
            createdAt: new Date().toISOString(),
            projectId: 'L7vcBh0TzRMv7cyXkdWH', // Account ID
            status: Statuses.UNASSIGNED, // UNASSIGNED || IN_PROGRESS || COMPLETED
          })
          console.log(snap.id)
        } catch (error) {
          console.log(error)
        }
      }
      const fn2 = async () => {
        try {
          const snap = await getTodos()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn3 = async () => {
        try {
          const Statuses = {
            IN_PROGRESS: 'IN_PROGRESS',
            UNASSIGNED: 'UNASSIGNED',
            COMPLETED: 'COMPLETED',
          }
          const field = `status`
          const operator = '=='
          const value = Statuses.IN_PROGRESS
          const snap = await getTodosByQuery({ field, operator, value })
          snap.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn4 = async () => {
        try {
          const id = 'ZTWC2oiwbDK2uZa98FD4'
          const snap = await getTodoById(id)
          console.log(snap.data())
        } catch (error) {
          console.log(error)
        }
      }
      const fn5 = async () => {
        try {
          const id = '8X5g5GNIMYwKqcWb2gd9'
          const response = await removeTodoById(id)
          alert('Success')
        } catch (error) {
          console.log(error)
        }
      }
      const fn6 = async () => {
        try {
          const id = 'ZTWC2oiwbDK2uZa98FD4'
          const snap = await updateTodoById(id, {
            title: 'My new todo 1',
            updatedAt: new Date().toISOString(),
          })
          console.log(snap)
        } catch (error) {
          console.log(error)
        }
      }
      fn1()
      // fn2()
      // fn3()
      // fn4()
      // fn5()
      // fn6()
    },
    handleTestUsers() {
      const fn1 = async () => {
        try {
          const Ranks = {
            LV1: 'LV1',
            LV2: 'LV2',
            LV3: 'LV3',
            LV4: 'LV4',
            LV5: 'LV5',
          }
          const snap = await createUser({
            createdAt: new Date().toISOString(),
            name: 'Alice Alley',
            rank: Ranks.LV1,
          })
          console.log(snap.id)
        } catch (error) {
          console.log(error)
        }
      }
      const fn2 = async () => {
        try {
          const snap = await getUsers()
          snap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn3 = async () => {
        try {
          const Ranks = {
            LV1: 'LV1',
            LV2: 'LV2',
            LV3: 'LV3',
            LV4: 'LV4',
            LV5: 'LV5',
          }
          const field = `rank`
          const operator = '=='
          const value = Ranks.LV4
          const snap = await getUsersByQuery({ field, operator, value })
          snap.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
          })
        } catch (error) {
          console.log(error)
        }
      }
      const fn4 = async () => {
        try {
          const id = 'RH2xsmTsSiZtzk11oba1'
          const snap = await getUserById(id)
          console.log(snap.data())
        } catch (error) {
          console.log(error)
        }
      }
      const fn5 = async () => {
        try {
          const id = '7A2lY9dFpAltKIsFWwF1'
          const response = await removeUserById(id)
          alert('Success')
        } catch (error) {
          console.log(error)
        }
      }
      const fn6 = async () => {
        try {
          const id = 'lHz7eNhMzUA56SLYHPMJ'
          const snap = await updateUserById(id, {
            name: 'Alice Alex',
          })
          console.log(snap)
        } catch (error) {
          console.log(error)
        }
      }
      fn1()
      // fn2()
      // fn3()
      // fn4()
      // fn5()
      // fn6()
    },*/
  },
}
</script>

<style></style>
